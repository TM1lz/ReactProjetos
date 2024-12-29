import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./UserInfo.css";

export default function UserInfo() {
  const { id } = useParams(); // Obtém o ID da URL
  const [user, setUser] = useState(null); // Armazena os dados do usuário
  const [editUser, setEditUser] = useState(null); // Armazena os dados editáveis
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar o modo de edição

  // Carregar os dados do usuário com base no ID
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setEditUser(data); // Preenche os campos editáveis com os dados do usuário
      })
      .catch((error) => console.error("Erro ao carregar os detalhes:", error));
  }, [id]);

  // Atualiza os campos de edição
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({
      ...prev,
      [name]: value, // Atualiza o campo específico
    }));
  };

  // Lida com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados editados:", editUser);
    // Aqui você pode fazer uma requisição PUT ou PATCH para salvar os dados no backend
  };

  // Função para alternar o modo de edição
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Se os dados ainda não estiverem carregados
  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="userinfo">
      <h1>Dados do Usuário</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter username"
            value={editUser.name || ""}
            onChange={handleChange}
            readOnly={!isEditing} // Define se o campo é somente leitura
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={editUser.email || ""}
            onChange={handleChange}
            readOnly={!isEditing} // Define se o campo é somente leitura
          />
        </div>

        <div className="userinfor-tell">
          <div className="input-group">
            <label htmlFor="phone">Telefone (DDD):</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="(DD)"
              value={editUser.phone ? editUser.phone.split(" ")[0] : ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>

          <div className="input-group">
            <label htmlFor="phoneNumber">Telefone:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Tell"
              value={editUser.phone ? editUser.phone.split(" ")[1] : ""}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="website">Website:</label>
          <input
            type="text"
            id="website"
            name="website"
            placeholder="Enter website"
            value={editUser.website || ""}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>

        <div className="input-group">
          <label htmlFor="addressStreet">Endereço:</label>
          <input
            type="text"
            id="addressStreet"
            name="addressStreet"
            placeholder="Enter street"
            value={editUser.address ? editUser.address.street : ""}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>

        <div className="input-group">
          <label htmlFor="addressCity">Cidade:</label>
          <input
            type="text"
            id="addressCity"
            name="addressCity"
            placeholder="Enter city"
            value={editUser.address ? editUser.address.city : ""}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>

        <button type="submit">{isEditing ? "Salvar" : ""}</button>
      </form>

      {/* Alternar para editar ou cancelar */}
      <button type="button" onClick={toggleEditMode}>
        {isEditing ? "Cancelar" : "Editar"}
      </button>
    </div>
  );
}
