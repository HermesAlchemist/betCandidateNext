// src/contexts/AuthContext.js
'use client';

import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const { push } = useRouter();
    const [walletAddress, setWalletAddress] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true); // Novo estado

    useEffect(() => {
        const wallet = localStorage.getItem("wallet");
        if (wallet) {
            setWalletAddress(wallet);
        }
        setIsAuthLoading(false); // Autenticação carregada

        if (typeof window !== 'undefined' && window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
        }

        return () => {
            if (typeof window !== 'undefined' && window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            }
        };
    }, []);

    const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
            setWalletAddress(null);
            localStorage.removeItem("wallet");
            push("/");
        } else {
            setWalletAddress(accounts[0]);
            localStorage.setItem("wallet", accounts[0]);
        }
    };

    const logout = () => {
        setWalletAddress(null);
        localStorage.removeItem("wallet");
        push("/");
    };

    return (
        <AuthContext.Provider value={{ walletAddress, setWalletAddress, logout, isAuthLoading }}>
            {children}
        </AuthContext.Provider>
    );
}
