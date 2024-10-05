// src/app/page.js
"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { doLogin } from "@/services/Web3Service";
import { AuthContext } from "@/contexts/AuthContext";

export default function Home() {

  const { push } = useRouter();

  const { walletAddress, setWalletAddress, logout } = useContext(AuthContext);

  const [message, setMessage] = useState("");

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  async function btnLoginClick() {
    if (walletAddress) {
      // Se já estiver conectado, vai para a página de apostas
      push("/bet");
    } else {
      setMessage("Conectando à sua carteira, aguarde...");
      try {
        const account = await doLogin();
        setWalletAddress(account);
        setMessage("");
        push("/bet");
      } catch (err) {
        console.error(err);
        setMessage(err.message);
      }
    }
  }

  return (
    <>
      <Head>
        <title>BetCandidate | Home</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">BetCandidate</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Alternar navegação">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Início</a>
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
        <div className="row align-items-center">
          <div className="col-lg-6 order-lg-2 mb-4 mb-lg-0">
            <img
              src="https://s2-g1.glbimg.com/AH6WhvpLTZuTDT3s2iN5JqyO8wk=/0x0:800x449/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2024/Q/R/UFakjPTaCLfw4BihlpvA/cc183b40-6f58-11ef-9274-898a88078355.png.webp"
              className="img-fluid rounded shadow"
              alt="Eleições Americanas"
            />
          </div>
          <div className="col-lg-6 order-lg-1">
            <h1 className="display-4 fw-bold mb-3">Aposte no Próximo Presidente dos EUA</h1>
            <p className="lead mb-4">Participe das apostas on-chain nas eleições americanas e tenha a chance de ganhar grandes prêmios.</p>
            <button
              type="button"
              className="btn btn-primary btn-lg px-5"
              onClick={btnLoginClick}
            >
              <img src="/metamask.svg" width={50} className="me-2" alt="MetaMask" />
              {walletAddress ? "Ir para Apostas" : "Conectar MetaMask"}
            </button>
          </div>
        </div>
        {message && (
          <div className="alert alert-info mt-3 text-center" role="alert">
            {message}
          </div>
        )}
      </div>
      <footer className="bg-light text-muted py-4">
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
