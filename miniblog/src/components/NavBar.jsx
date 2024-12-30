import { NavLink } from "react-router-dom"

import styles from "./NavBar.module.css"
export default function NavBar() {
  return (
    <nav className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>
            Mine <span>Blog</span>
        </NavLink>
        <ul className={styles.link_list}>
            <li>
                <NavLink to="/" className={({isActive})=>(isActive ? styles.active : "")}>
                Home
                </NavLink>
            </li>

            <li>
                <NavLink to="/About" className={({isActive})=>(isActive ? styles.active : "")}>
                Sobre
                </NavLink>
            </li>
        </ul>
    </nav>
  )
}
