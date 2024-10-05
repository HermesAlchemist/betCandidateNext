// src/components/AuthWrapper.js
'use client';

import { AuthProvider } from '@/contexts/AuthContext';

export default function AuthWrapper({ children }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}
