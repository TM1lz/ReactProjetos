import { NavLink } from "react-router-dom";
import { useAuthValue } from "../context/AuthContext"; // Use o contexto de autenticação
import styles from "./NavBar.module.css";
import { useState, useEffect } from "react";
import useAuthentication from "../hooks/useAuthentication";

export default function NavBar() {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  const [userName, setUserName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar o menu hamburger

  useEffect(() => {
    if (user) {
      setUserName(user.displayName);
    } else {
      setUserName(""); // Limpa o nome do usuário quando ele sai
    }
  }, [user]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Alterna o estado do menu
  };

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <NavLink to="/" className={styles.brand}>
        Mine <span>Blog</span>
      </NavLink>

      {/* Ícone do Menu Hamburger */}
      <div className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`} onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>

      {/* Menu de Links */}
      <ul className={`${styles.link_list} ${menuOpen ? styles.show : ""}`}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
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
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>
        {user && (
          <li>
            <a onClick={logout} className={styles.logoutBtn}>
              Sair
            </a>
          </li>
        )}
      </ul>

      {/* Saudação com o nome do usuário */}
      {user && <p className={styles.welcome}>Bem-vindo, {userName}</p>}
    </nav>
  );
}
