# **BetCandidate**

**BetCandidate** é uma plataforma de apostas on-chain que permite aos usuários apostar em quem será o próximo presidente dos Estados Unidos. O aplicativo é construído com Next.js e React, utilizando contratos inteligentes na rede Ethereum (Sepolia Testnet) para garantir transparência e segurança em todas as transações.


---


# Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Uso](#uso)
- [Contrato Inteligente](#contrato-inteligente)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)


---


# Visão Geral

O BetCandidate permite que os usuários participem de apostas descentralizadas sobre o resultado das eleições presidenciais americanas. Utilizando a carteira MetaMask, os usuários podem conectar-se à plataforma, escolher seu candidato preferido e apostar uma quantidade desejada de ETH. Após o encerramento das eleições e divulgação do resultado oficial, os vencedores podem reivindicar seus prêmios diretamente na plataforma.


---


# Funcionalidades

- **Conexão com MetaMask**: Os usuários podem conectar suas carteiras MetaMask para interagir com a plataforma.

- **Verificação de Rede**: O aplicativo verifica se o usuário está conectado à rede Sepolia e solicita a mudança de rede, se necessário.

- **Apostar em Candidatos**: Os usuários podem apostar em um dos candidatos disponíveis até a data limite de apostas.

- **Reivindicar Prêmios**: Após o resultado oficial, os vencedores podem reivindicar seus prêmios.

- **Interface Intuitiva**: Utiliza Bootstrap para uma interface amigável e responsiva.

- **Transparência On-Chain**: Todas as transações são realizadas através de contratos inteligentes na rede Ethereum (Sepolia Testnet).


---


# Tecnologias Utilizadas

- **Next.js 14.3.3**: Framework React para desenvolvimento web.
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Web3.js**: Biblioteca para interagir com o Ethereum blockchain.
- **MetaMask**: Extensão de navegador para interação com a blockchain Ethereum.
- **Solidity**: Linguagem de programação para contratos inteligentes na Ethereum.
- **Bootstrap 5**: Framework CSS para estilização e responsividade.
- **React Context API**: Gerenciamento de estado global para autenticação.


# Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 14 ou superior)
- **NPM** (gerenciador de pacotes do Node.js)
- **MetaMask** (extensão instalada em seu navegador)
- **Conta na rede Sepolia Testnet** com ETH de teste (pode ser obtido em faucets)


# Instalação
1. Clone o repositório:

```bash
git clone https://github.com/HermesAlchemist/BetCandidateNext.git
```

2. Navegue até o diretório do projeto:

```bash
cd BetCandidate/dapp
```
3. Instale as dependências:

```bash
npm install
```


# Uso

## Executando o Projeto Localmente

1. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
2. Acesse o aplicativo no navegador:

Abra `http://localhost:3000` para ver o aplicativo.

## Interagindo com a Plataforma

### 1. Conecte-se com a MetaMask:

- Certifique-se de que sua MetaMask está conectada à rede Sepolia Testnet.
- Clique em **`Conectar MetaMask`** na página inicial.

### 2. Aposte em um Candidato:

- Após conectar-se, você será redirecionado para a página de apostas.
- Escolha um dos candidatos disponíveis e clique em **`Apostar neste candidato`**.
- Insira o valor em ETH que deseja apostar.

### 3. Reivindique seu Prêmio:

- Após o resultado oficial das eleições, acesse a plataforma.
- Se o candidato em quem você apostou venceu, clique em "Pegar meu prêmio" para receber seus ganhos.

## Observações
- **Taxa de Comissão**: Uma taxa de 10% é deduzida do montante total das apostas como comissão para manutenção da plataforma.
- **Transparência**: O código do contrato inteligente é público e pode ser verificado no Etherscan.

# Contrato Inteligente
O contrato inteligente está implantado na rede Sepolia Testnet.

- **Endereço do Contrato**: `0xf769620cB16Dde326539B403A89c4E6e46A99a27`
- **Etherscan**: [Ver Contrato no Etherscan](https://sepolia.etherscan.io/address/0xf769620cb16dde326539b403a89c4e6e46a99a27)

# Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

Passos para contribuir:

1. Faça um fork do projeto.
No GitHub, clique em "Fork" no canto superior direito da página do repositório.

2. Clone o repositório forkado:
   
git clone https://github.com/seu-usuario/BetCandidate.git

3. Crie uma nova branch:

```bash
Copiar código
git checkout -b feature/nova-funcionalidade
```

4. Commit suas mudanças:

bash
Copiar código
git commit -m 'Adiciona nova funcionalidade'
Envie para a branch:

bash
Copiar código
git push origin feature/nova-funcionalidade
Abra um pull request.

# Licença
Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

# Contato
Nome: Heitor
Email: seu-email@example.com
GitHub: seu-usuario
# Agradecimentos
Agradecemos a todos os colaboradores e usuários que ajudam a melhorar o BetCandidate. Sua participação é essencial para o sucesso deste projeto.

Screenshots
(Opcional: Adicione screenshots do aplicativo para ilustrar a interface e funcionalidades.)

Notas Adicionais
Segurança: Certifique-se de nunca compartilhar suas chaves privadas. O BetCandidate não solicita nem armazena informações privadas dos usuários.
Testnet: Este aplicativo utiliza a Sepolia Testnet. Os ETH utilizados são de teste e não possuem valor real.
Responsabilidade: Este projeto é para fins educacionais e de demonstração. Não nos responsabilizamos por quaisquer perdas ou danos decorrentes do uso deste aplicativo.
Troubleshooting
Se você encontrar problemas ao executar o aplicativo, tente as seguintes etapas:

Verifique a Conexão com a Rede Sepolia:

Certifique-se de que sua MetaMask está conectada à rede Sepolia.
Se necessário, adicione a rede Sepolia manualmente na MetaMask.
Erros ao Instalar Dependências:

Certifique-se de que está utilizando a versão correta do Node.js e NPM.
Exclua a pasta node_modules e o arquivo package-lock.json, e execute npm install novamente.
Problemas com a MetaMask:

Atualize a extensão MetaMask para a versão mais recente.
Limpe o cache do navegador ou tente em um navegador diferente.
Desenvolvimento Futuro
Adicionar Mais Candidatos:

Expandir a lista de candidatos disponíveis para apostas.
Melhorias na Interface:

Implementar animações e transições suaves.
Melhorar a responsividade em dispositivos móveis.
Funcionalidades Avançadas:

Implementar um sistema de apostas múltiplas.
Adicionar suporte a outras criptomoedas.
Esperamos que você aproveite o BetCandidate! Se tiver alguma dúvida ou sugestão, não hesite em entrar em contato.
