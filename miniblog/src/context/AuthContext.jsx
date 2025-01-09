import { useContext, createContext } from "react";

// Criação do contexto de autenticação
// O createContext cria um contexto que permitirá o compartilhamento de informações de autenticação
// entre componentes sem a necessidade de passar props diretamente
const AuthContext = createContext();

export function AuthProvider({ children, value }) {
  // O AuthProvider é um componente que envolve a árvore de componentes da aplicação
  // e fornece a informação de autenticação para qualquer componente que utilize o contexto
  // O valor passado para o "value" será disponibilizado para os componentes filhos através do contexto

  return (
    <AuthContext.Provider value={value}>
      {children} {/* Aqui, qualquer componente filho dentro do AuthProvider terá acesso ao contexto */}
    </AuthContext.Provider>
  );
}

// Hook personalizado para consumir o valor do contexto de autenticação
export function useAuthValue() {
  // useContext é utilizado para acessar o valor atual do contexto
  // Nesse caso, estamos pegando o valor do contexto de autenticação, que provavelmente será o usuário
  return useContext(AuthContext);
}
