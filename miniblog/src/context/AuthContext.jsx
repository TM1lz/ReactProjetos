import { useContext, createContext } from "react";

// Criação do contexto de autenticação
const AuthContext = createContext();

export function AuthProvider({ children, value }) {
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuthValue(){
    return useContext(AuthContext)
}