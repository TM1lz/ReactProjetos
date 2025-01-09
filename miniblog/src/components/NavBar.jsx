import { NavLink } from "react-router-dom";
import { useAuthValue } from "../context/AuthContext"; // Use o contexto de autenticação
import styles from "./NavBar.module.css";
import { useState, useEffect } from "react";
import useAuthentication from "../hooks/useAuthentication";

export default function NavBar() {
  // Acessando o 'user' diretamente do contexto com 'useAuthValue'
  const { user } = useAuthValue(); // Aqui usamos o 'useAuthValue' para acessar o contexto de autenticação
  const [userName, setUserName] = useState("");

  // UseEffect para atualizar o nome do usuário assim que o 'user' for alterado
  useEffect(() => {
    if (user) {
      setUserName(user.displayName);
    }
  }, []); // O efeito será disparado sempre que o 'user' mudar

  return (
    <nav className={styles.navbar}>
      {/* Link para a página inicial */}
      <NavLink to="/" className={styles.brand}>
        Mine <span>Blog</span>
      </NavLink>
      <ul className={styles.link_list}>
        {/* Link para a página Home */}
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        {/* Se o usuário não estiver autenticado, mostrar links de Login e Register */}
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
        {/* Link para a página "Sobre" */}
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>
      </ul>

      {/* Exibe o nome do usuário, caso esteja logado */}
      {user && <p>Bem-vindo{`, ${userName}`}</p>}
    </nav>
  );
}

