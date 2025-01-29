// Importando o React e Link para navegação
import React from 'react';
import { Link } from 'react-router-dom';
// Importando o arquivo de estilos específico para o componente
import styler from './PosDetail.module.css';  // Importando o arquivo de estilos

// Componente de detalhes do post
export default function PostDetail({ post }) {
  return (
    <div className={styler['post-item']}> {/* Container principal do post */}
      
      {/* Verificando se a URL da imagem está presente */}
      {post.image ? (
        // Se a imagem estiver disponível, exibe a imagem
        <img src={post.image} alt={post.title} className={styler['post-image']} />
      ) : (
        // Caso a imagem não esteja disponível, exibe um texto
        <div className={styler['no-image']}>Imagem não disponível</div>
      )}

      {/* Exibindo o título do post */}
      <h2 className={styler['post-title']}>{post.title}</h2>

      {/* Exibindo o conteúdo do post */}
      <p className={styler['post-content']}>{post.content}</p>

      {/* Exibindo a data de criação do post */}
      <p className={styler['post-date']}>
        <strong>Data de Criação:</strong> 
        {/* Convertendo o timestamp da data para uma data legível */}
        {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}
      </p>

      {/* Link para a página do post detalhado */}
      <Link to={`/post/${post.id}`} className={styler['read-more-link']}>
        Ler mais
      </Link>
    </div>
  );
}
