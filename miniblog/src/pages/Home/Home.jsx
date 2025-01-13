import React from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { InboxIcon } from '@heroicons/react/24/outline';
import styler from "./Home.module.css";
import PostDetail from "../../components/PosDetail";

export default function Home() {
  const { documents: posts, loading, error } = useFetchDocuments("posts");

  if (loading) {
    return <div className={styler.loading}>Carregando...</div>;
  }

  if (error) {
    return (
      <div className={styler.error}>
        Erro ao carregar os dados: {error.message}
      </div>
    );
  }

  return (
    <div className={styler.container}>

      {/* Renderizar posts ou a mensagem quando não houver posts */}
      {posts && posts.length > 0 ? (
        posts.map((post) => <PostDetail key={post.id} post={post} />)
      ) : (
        <div className={styler.noPosts}>
          <InboxIcon className={styler.noPostsIcon} />
          <p>Nenhum post encontrado.</p>
        </div>
      )}
    </div>
  );
}
