import React from 'react';
import { Link } from 'react-router-dom';
import styler from './PosDetail.module.css';  // Importando o arquivo de estilos

export default function PostDetail({ post }) {
  return (
    <div className={styler['post-item']}>
      {/* Verificando se a URL da imagem está presente */}
      {post.image ? (
        <img src={post.image} alt={post.title} className={styler['post-image']} />
      ) : (
        <div className={styler['no-image']}>Imagem não disponível</div>
      )}

      {/* Título do post */}
      <h2 className={styler['post-title']}>{post.title}</h2>

      {/* Exibindo o conteúdo do post */}
      <p className={styler['post-content']}>{post.content}</p>

      {/* Data de criação do post */}
      <p className={styler['post-date']}>
        <strong>Data de Criação:</strong> {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}
      </p>

      {/* Link para a página do post detalhado */}
      <Link to={`/post/${post.id}`} className={styler['read-more-link']}>
        Ler mais
      </Link>
    </div>
  );
}
