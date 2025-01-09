import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Importando o Navigate para redirecionamento
import "./App.css"; // Estilos da aplicação

// Components
import NavBar from "./components/NavBar"; // Barra de navegação
import Footer from "./components/Footer"; // Rodapé

// Pages
import Home from "./pages/Home/Home"; // Página inicial
import About from "./pages/About/About"; // Página "Sobre"
import Login from "./pages/Login/Login"; // Página de Login
import Register from "./pages/Register/Register"; // Página de Registro

// Hooks
import { useState, useEffect } from "react";

// Context
import { AuthProvider } from "./context/AuthContext"; // Contexto de autenticação

// Firebase
import { auth } from "./firebase/config"; // Instância de auth do Firebase
import { onAuthStateChanged } from "firebase/auth"; // Função para escutar mudanças no estado de autenticação

function App() {
  // Estado para armazenar as informações do usuário
  const [user, setUser] = useState(undefined);
  // Flag para mostrar o carregamento enquanto estamos aguardando a autenticação
  const loadingUser = user === undefined;

  // useEffect para ouvir o estado de autenticação do Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Atualiza o estado com o usuário autenticado ou null
    });

    // Função de limpeza para cancelar a escuta ao desmontar o componente
    return () => unsubscribe();
  }, []); // Este useEffect será executado apenas uma vez (no início)

  // Se o estado de autenticação está sendo carregado, mostra uma mensagem ou componente de loading
  if (loadingUser) {
    return <p>Carregando...</p>; // Substitua com um componente de loading mais sofisticado, se necessário
  }

  return (
    <div className="app">
      {/* Envolvendo o conteúdo com o AuthProvider para fornecer o estado do usuário aos componentes filhos */}
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          {/* Barra de navegação visível em todas as páginas */}
          <NavBar />
          <div className="container">
            <Routes>
              {/* Página inicial */}
              <Route path="/" element={<Home />} />
              {/* Página "Sobre" */}
              <Route path="/about" element={<About />} />
              {/* Página de Login */}
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
              {/* Página de Registro */}
              <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
            </Routes>
          </div>
          {/* Rodapé visível em todas as páginas */}
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
