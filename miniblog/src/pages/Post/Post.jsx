import { useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFechDocument';
import styler from './Post.module.css';  // Importando o arquivo CSS module

export default function Post() {
  const { id } = useParams(); // Get the 'id' from the URL parameters
  
  // Safeguard to prevent issues if 'id' is not present
  if (!id) {
    return <div>Error: ID parameter is missing</div>;
  }

  const { document: post, loading, error } = useFetchDocument("posts", id); // Fetch the post using 'id'

  // Loading and error handling
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Convert the Firebase timestamp to a readable date
  const createdAt = post?.createdAt?.seconds ? new Date(post.createdAt.seconds * 1000).toLocaleString() : "Date not available";

  return (
    <div className={styler['post-item']}>
      <h1 className={styler['post-title']}>{post?.title || 'Post not found'}</h1>

      {/* Post image */}
      <img
        className={styler['post-image']}
        src={post?.image}
        alt={post?.title}
      />

      {/* Post content */}
      <p className={styler['post-content']}>{post?.body || 'No content available'}</p>

      {/* Post metadata */}
      <div style={{ marginTop: '20px', color: '#555' }}>
        <p className={styler['post-date']}><strong>Created By:</strong> {post?.createBy || 'Unknown'}</p>
        <p className={styler['post-date']}><strong>Created At:</strong> {createdAt}</p>
        <p className={styler['post-date']}><strong>Tags:</strong> {post?.tags?.join(', ') || 'No tags'}</p>
      </div>
      
      {/* Optionally, you can add a "Read more" link if necessary */}
      {/* <a href="#" className={styler['read-more-link']}>Read more</a> */}
    </div>
  );
}
