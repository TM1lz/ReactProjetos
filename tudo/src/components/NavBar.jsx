import "./NavBar.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navbar">
      <a href="http://localhost:5173/"><h2>ToDoList</h2></a>
      <div className="buttons-navbar">
        <Link to="/user">
          <button>Lista</button>
        </Link>
        <Link to="/pesquisar">
          <button>Pesquisar</button>
        </Link>
        <Link to="teste">
          <button>Teste</button>
        </Link>
      </div>
    </div>
  );
}
