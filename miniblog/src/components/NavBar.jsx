// Importações necessárias para a navegação e contexto de autenticação
import { NavLink } from "react-router-dom"; 
import { useAuthValue } from "../context/AuthContext"; // Usando o contexto de autenticação
import styles from "./NavBar.module.css"; // Importando estilos para o componente
import { useState, useEffect } from "react"; // Hooks do React
import useAuthentication from "../hooks/useAuthentication"; // Hook personalizado de autenticação

export default function NavBar() {
  // Pegando o usuário autenticado do contexto
  const { user } = useAuthValue();
  // Pegando a função de logout do hook de autenticação
  const { logout } = useAuthentication();

  // Estado para armazenar o nome do usuário
  const [userName, setUserName] = useState("");
  // Estado para controlar o menu hambúrguer (aberto/fechado)
  const [menuOpen, setMenuOpen] = useState(false);

  // Efeito que atualiza o nome do usuário quando o estado 'user' mudar
  useEffect(() => {
    if (user) {
      setUserName(user.displayName); // Define o nome do usuário se ele estiver logado
    } else {
      setUserName(""); // Limpa o nome quando o usuário sair
    }
  }, [user]);

  // Função para alternar o estado do menu hambúrguer
  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Alterna o estado de 'menuOpen'
  };

  return (
    <nav className={styles.navbar}>
      {/* Logo do blog */}
      <NavLink to="/" className={styles.brand}>
        Mine <span>Blog</span>
      </NavLink>

      {/* Ícone do menu hambúrguer - será exibido em telas pequenas */}
      <div className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`} onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>

      {/* Menu de links de navegação */}
      <ul className={`${styles.link_list} ${menuOpen ? styles.show : ""}`}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        {/* Se o usuário não estiver autenticado, exibe os links de login e registro */}
        {!user && (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Register
              </NavLink>
            </li>
          </>
        )}
        {/* Se o usuário estiver autenticado, exibe o link para criar um novo post */}
        {user && (
          <>
            <li>
              <NavLink
                to="/create-post"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Novo Post
              </NavLink>
            </li>
          </>
        )}
        {/* Link para a página "Sobre", disponível para todos */}
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>
        {/* Se o usuário estiver autenticado, exibe o botão de logout */}
        {user && (
          <li>
            <a onClick={logout} className={styles.logoutBtn}>
              Sair
            </a>
          </li>
        )}
      </ul>

      {/* Saudação com o nome do usuário (só aparece se estiver logado) */}
      {user && <p className={styles.welcome}>Bem-vindo, {userName}</p>}
    </nav>
  );
}
