// src/app/bet/page.js
'use client';

import { checkNetwork, claimPrize, getDispute, placeBet } from "@/services/Web3Service";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import Web3 from "web3";
import { AuthContext } from "@/contexts/AuthContext";

export default function Bet() {
    const { push } = useRouter();
    const { walletAddress, logout } = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const [dispute, setDispute] = useState({
        candidate1: "Loading...",
        candidate2: "Loading...",
        image1: "https://img.odcdn.com.br/wp-content/uploads/2017/06/20170609141843.jpg",
        image2: "https://img.odcdn.com.br/wp-content/uploads/2017/06/20170609141843.jpg",
        total1: 0,
        total2: 0,
        winner: 0
    });

    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle.min.js');

        if (!walletAddress) {
            push("/");
        } else {
            setMessage("Verificando a rede, aguarde...");
            checkNetwork()
                .then(() => {
                    setMessage("Obtendo dados da disputa, aguarde...");
                    return getDispute();
                })
                .then(dispute => {
                    setDispute(dispute);
                    setMessage("");
                })
                .catch(err => {
                    console.error(err);
                    setMessage(err.message);
                });
        }
    }, [walletAddress]);

    function processBet(candidate) {
        setMessage("Verificando a rede, aguarde...");
        checkNetwork()
            .then(() => {
                const amount = prompt("Quantidade em ETH para apostar:", "0.01");
                if (amount !== null && amount !== "") {
                    setMessage("Processando a aposta, aguarde...");
                    return placeBet(candidate, amount);
                } else {
                    throw new Error("Aposta cancelada pelo usuário.");
                }
            })
            .then(() => {
                alert("Aposta recebida com sucesso! As informações podem demorar alguns segundos para serem atualizadas.");
                setMessage("");
                return getDispute();
            })
            .then(dispute => {
                setDispute(dispute);
            })
            .catch(err => {
                console.error(err);
                setMessage(err.message);
            });
    }

    function btnLoginClick() {
        push("/");
    }

    function btnClaimClick() {
        setMessage("Verificando a rede, aguarde...");
        checkNetwork()
            .then(() => {
                setMessage("Processando a reivindicação do prêmio, aguarde...");
                return claimPrize();
            })
            .then(() => {
                alert("Prêmio coletado com sucesso! As informações podem demorar alguns segundos para serem atualizadas na sua carteira.");
                setMessage("");
            })
            .catch(err => {
                console.error(err);
                setMessage(err.message);
            });
    }

    return (
        <>
            <Head>
                <title>BetCandidate | Apostar</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand fw-bold" href="/">BetCandidate</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Alternar navegação">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav align-items-center">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Início</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/about">Regras</a>
                            </li>
                            <li className="nav-item">
                                {walletAddress ? (
                                    <>
                                        <span className="navbar-text ms-3 text-light">
                                            {walletAddress.substring(0, 6)}...{walletAddress.slice(-4)}
                                        </span>
                                        <button className="btn btn-outline-light ms-3" onClick={logout}>
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <button className="btn btn-outline-light ms-3" onClick={btnLoginClick}>
                                        <img src="/metamask.svg" width={24} className="me-2" alt="MetaMask" />
                                        Conectar MetaMask
                                    </button>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container py-5">
                <header className="text-center mb-5">
                    <h1 className="display-4 fw-bold">BetCandidate</h1>
                    <p className="lead mb-0">Apostas on-chain nas eleições americanas.</p>
                    {dispute.winner == 0
                        ? <p className="lead">Você tem até o dia da eleição para deixar sua aposta em um dos candidatos.</p>
                        : <p className="lead">Eleições encerradas! Veja o vencedor(a) abaixo e solicite seu prêmio.</p>
                    }
                </header>
                <div className="row justify-content-center">
                    {(dispute.winner == 0 || dispute.winner == 1) && (
                        <div className="col-md-5 mb-4">
                            <div className="card text-center h-100 shadow">
                                <img
                                    src={dispute.image1}
                                    className="card-img-top"
                                    alt={dispute.candidate1}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{dispute.candidate1}</h5>
                                    <p className="card-text">{Web3.utils.fromWei(dispute.total1, "ether")} ETH apostados</p>
                                    <p className="card-text">0 Apostadores</p>
                                    {dispute.winner == 1
                                        ? <button className="btn btn-primary" onClick={btnClaimClick}>Pegar meu prêmio</button>
                                        : <button className="btn btn-primary" onClick={() => processBet(1)}>Apostar neste candidato</button>
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                    {(dispute.winner == 0 || dispute.winner == 2) && (
                        <div className="col-md-5 mb-4">
                            <div className="card text-center h-100 shadow">
                                <img
                                    src={dispute.image2}
                                    className="card-img-top"
                                    alt={dispute.candidate2}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{dispute.candidate2}</h5>
                                    <p className="card-text">{Web3.utils.fromWei(dispute.total2, "ether")} ETH apostados</p>
                                    <p className="card-text">0 Apostadores</p>
                                    {dispute.winner == 2
                                        ? <button className="btn btn-primary" onClick={btnClaimClick}>Pegar meu prêmio</button>
                                        : <button className="btn btn-primary" onClick={() => processBet(2)}>Apostar neste candidato</button>
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {message && (
                    <div className="alert alert-info mt-3 text-center" role="alert">
                        {message}
                    </div>
                )}
            </div>
            <footer className="bg-light text-muted py-4 mt-5">
                <div className="container text-center">
                    <p className="mb-1">&copy; 2024 BetCandidate, Inc. Todos os direitos reservados.</p>
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <a href="/" className="text-muted">Início</a>
                        </li>
                        <li className="list-inline-item">
                            <a href="/about" className="text-muted">Regras</a>
                        </li>
                    </ul>
                </div>
            </footer>
        </>
    );
}
