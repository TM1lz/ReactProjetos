import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./List.css";

export default function List() {
  const [data, setData] = useState([]); // Estado para armazenar os dados JSON
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    // Carregar o arquivo JSON
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json()) // Converte o conteúdo para JSON
      .then((json) => setData(json)) // Armazena no estado
      .catch((error) => console.error("Erro ao carregar o JSON:", error)); // Tratamento de erro
  }, []); // O array vazio faz a requisição apenas uma vez

  const handleInfoClick = (id) => {
    // Navega para a página de detalhes do usuário com o ID
    navigate(`/user/${id}`);
  };

  return (
    <div className="conent-list">
      <h1>List On</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id} className="li-list">
            <div className="div-lis">
              <div className="li-name">
                <h2>Name: </h2>
                <p>{user.name}</p>
              </div>
              <div className="li-email">
                <h2>Email: </h2>
                <p>{user.email}</p>
              </div>
            </div>

            <button onClick={() => handleInfoClick(user.id)}>Infor</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

