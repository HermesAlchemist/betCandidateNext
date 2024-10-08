// src/services/Web3Service.js
import Web3 from "web3";
import ABI from "./ABI.json"

const CONTRACT_ADDRESS = "0xf769620cB16Dde326539B403A89c4E6e46A99a27";

export async function doLogin() {
    if (typeof window.ethereum === 'undefined') throw new Error(`MetaMask não está instalada!`);

    const web3 = new Web3(window.ethereum);

    try {
        // Solicita acesso à conta
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (!accounts || !accounts.length) throw new Error(`MetaMask não foi autorizada`);

        // Verifica se a rede está correta e tenta mudar se necessário
        await checkNetwork();

        localStorage.setItem("wallet", accounts[0]);
        return accounts[0];
    } catch (error) {
        throw error;
    }
}

const SEPOLIA_NETWORK_ID = 11155111;

export async function checkNetwork() {
    const web3 = new Web3(window.ethereum);
    const networkId = await web3.eth.getChainId();
    if (networkId !== SEPOLIA_NETWORK_ID) {
        try {
            // Solicita a mudança para a rede Sepolia
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0xaa36a7' }], // Hexadecimal de 11155111
            });
        } catch (error) {
            // Se a rede Sepolia não estiver adicionada no MetaMask
            if (error.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: '0xaa36a7',
                            chainName: 'Sepolia Test Network',
                            nativeCurrency: {
                                name: 'Sepolia Ether',
                                symbol: 'ETH',
                                decimals: 18,
                            },
                            rpcUrls: ['https://sepolia.infura.io/v3/'], // Adicione um RPC válido aqui
                            blockExplorerUrls: ['https://sepolia.etherscan.io'],
                        }],
                    });
                } catch (addError) {
                    throw new Error('Não foi possível adicionar a rede Sepolia ao MetaMask.');
                }
            } else {
                throw new Error('Por favor, mude para a rede Sepolia no MetaMask.');
            }
        }
    }
}


function getContract() {
    if (!window.ethereum) throw new Error(`Metamask isn't installed!`);

    const from = localStorage.getItem("wallet");
    const web3 = new Web3(window.ethereum);
    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });
}

export async function getDispute() {
    const contract = getContract();
    let disputeData = {};
    let totalBettors1 = 0;
    let totalBettors2 = 0;

    try {
        const dispute = await contract.methods.dispute().call();
        totalBettors1 = await contract.methods.totalBettors1().call();
        totalBettors2 = await contract.methods.totalBettors2().call();

        // Mapeie os campos manualmente
        disputeData = {
            candidate1: dispute.candidate1 || dispute[0],
            candidate2: dispute.candidate2 || dispute[1],
            image1: dispute.image1 || dispute[2],
            image2: dispute.image2 || dispute[3],
            total1: dispute.total1 || dispute[4],
            total2: dispute.total2 || dispute[5],
            winner: dispute.winner || dispute[6],
            totalBettors1: totalBettors1.toString(),
            totalBettors2: totalBettors2.toString()
        };
    } catch (error) {
        console.error('Erro ao obter dados da disputa:', error);
    }

    console.log('Dispute Data:', disputeData);
    return disputeData;
}


export async function placeBet(candidate, amountInEth) {
    const contract = getContract();
    return contract.methods.bet(candidate).send({
        value: Web3.utils.toWei(amountInEth, "ether"),
        gas: 207208,
        gasPrice: "209833329733"
    });
}

export async function finishDispute(winner) {
    const contract = getContract();
    return contract.methods.finish(winner).send();
}

export async function claimPrize() {
    const contract = getContract();
    return contract.methods.claim().send();
}