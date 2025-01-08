import { NavLink } from "react-router-dom"
import useAuthentication from "../hooks/useAuthentication"
import { useAuthValue } from "../context/AuthContext"

import styles from "./NavBar.module.css"
export default function NavBar() {
    const {user} = useAuthentication()
  return (
    <nav className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>
            Mine <span>Blog</span>
        </NavLink>
        <ul className={styles.link_list}>
            <button>
                <NavLink to="/" className={({isActive})=>(isActive ? styles.active : "")}>
                Home
                </NavLink>
            </button>
            {!user && (
                <>
            <button>
                <NavLink to="/login" className={({isActive})=>(isActive ? styles.active : "")}>
                Login
                </NavLink>
            </button>
            <button>
                <NavLink to="/register" className={({isActive})=>(isActive ? styles.active : "")}>
                Register
                </NavLink>
            </button>
                </>
            )}
            <button>
                <NavLink to="/About" className={({isActive})=>(isActive ? styles.active : "")}>
                Sobre
                </NavLink>
            </button>
        </ul>

        {user.name}
    </nav>
  )
}
