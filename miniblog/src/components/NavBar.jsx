import { NavLink } from "react-router-dom"

import styles from "./NavBar.module.css"
export default function NavBar() {
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
            <button>
                <NavLink to="/About" className={({isActive})=>(isActive ? styles.active : "")}>
                Sobre
                </NavLink>
            </button>
        </ul>
    </nav>
  )
}
