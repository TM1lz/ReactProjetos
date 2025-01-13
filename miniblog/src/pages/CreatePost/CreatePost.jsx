import { useState, useEffect } from "react";
import styler from "./CreatePost.module.css";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Importe o hook useNavigate

export default function CreatePost() {
  const { user } = useAuthValue(); // Obtendo o usuário autenticado
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const { insertComment, response } = useInsertDocument("posts"); // Passando a coleção de posts

  // Estado para mensagens de erro e sucesso
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Usando o hook useNavigate para redirecionar
  const navigate = useNavigate();

  // Verifica se o usuário está autenticado
  if (!user) {
    return <p>Você precisa estar logado para criar um post.</p>; // Mensagem caso o usuário não esteja logado
  }

  // Validação do formulário
  const validateForm = () => {
    if (!title || !image || !body || tags.length === 0) {
      setError("Todos os campos são obrigatórios.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Preparando os dados do post
    const post = {
      title,
      image,
      body,
      tags,
      uid: user.uid, // Usando user.uid para pegar o id do usuário autenticado
      createBy: user.displayName || "Usuário sem nome", // Verificando se displayName está disponível
    };

    try {
      await insertComment(post); // Inserindo o post no banco de dados
      setSuccess(true); // Sucesso
    } catch (err) {
      setError("Erro ao publicar o post. Tente novamente.");
    }
  };

  useEffect(() => {
    // Quando a resposta do post for carregada
    if (response.error) {
      setError(response.error);
    }
    if (response.loading === false && success) {
      // Limpar os campos após a publicação
      setTitle("");
      setImage("");
      setBody("");
      setTags([]);

     
    }
  }, [response, success, navigate]); // Monitorando 'response' e 'success'

  return (
    <div className={styler.container}>
      <h2 className={styler.title}>Criar Post</h2>
      <p className={styler.description}>
        Escreva o que quiser e compartilhe seu conhecimento com o mundo!
      </p>

      {/* Exibindo mensagens de erro e sucesso */}
      {error && <p className={styler.error}>{error}</p>}
      {success && <p className={styler.success}>Post publicado com sucesso!</p>}

      <form onSubmit={handleSubmit} className={styler.form}>
        <div className={styler.inputContainer}>
          <label htmlFor="title" className={styler.label}>
            Título
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styler.input}
            placeholder="Digite o título do seu post"
          />
        </div>

        <div className={styler.inputContainer}>
          <label htmlFor="image" className={styler.label}>
            Imagem
          </label>
          <input
            type="url"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className={styler.input}
            placeholder="Cole o link da imagem"
          />
        </div>

        <div className={styler.inputContainer}>
          <label htmlFor="body" className={styler.label}>
            Corpo do Post
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className={styler.textarea}
            placeholder="Escreva seu conteúdo aqui"
          ></textarea>
        </div>

        <div className={styler.inputContainer}>
          <label htmlFor="tags" className={styler.label}>
            Tags
          </label>
          <input
            type="text"
            id="tags"
            value={tags.join(", ")} // Exibe as tags separadas por vírgula
            onChange={(e) => setTags(e.target.value.split(",").map(tag => tag.trim()))}
            className={styler.input}
            placeholder="Adicione tags, separadas por vírgula"
          />
        </div>

        {/* Botão de publicar com loading */}
        <button 
          type="submit" 
          className={styler.submitButton} 
          disabled={response.loading} // Desabilitar quando estiver carregando
        >
          {response.loading ? "Pulicado!" : "Publicar"} {/* Texto ou carregamento */}
        </button>
      </form>
    </div>
  );
}
