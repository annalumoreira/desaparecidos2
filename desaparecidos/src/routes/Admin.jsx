import React from "react";
import "./Admin.css";
import baseLink from "../axios/config";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Admin() {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    try {
      const response = await baseLink.get("/posts");

      const data = response.data;
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

const deletePost = async (id) => {
    await baseLink.delete(`/posts/${id}`);
    const filteredPosts = posts.filter((post) => post.id !== id);
    setPosts(filteredPosts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h1>Gerenciar Post</h1>
      {!posts.length ? (
        <p>Carregando...</p>
      ) : (
        posts.map((post) => (
          <div className="post" key={post.id}>
            <h2>{post.title}</h2>
            <div className="actions">
              <Link to={`/posts/edit/${post.id}`} className="btn edit-btn">
                Editar
              </Link>
              <button className="btn delete-btn" onClick={() => deletePost(post.id)}>Deletar</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Admin;
