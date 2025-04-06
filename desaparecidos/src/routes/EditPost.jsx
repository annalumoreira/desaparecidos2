import React, { use } from 'react'
import baseLink from '../axios/config'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// import './EditPost.css'

const EditPost = () => {
    const navigate = useNavigate();

    const {id} = useParams();
    
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const getPost = async () => {
        try { 
        const response = await baseLink.get(`/posts/${id}`);
        const data = response.data;

        setTitle(data.title);
        setBody(data.body);
        } catch (error) {
            console.log(error)
        }
    };

    const editPost = async (e) => {
        e.preventDefault();

        const post = { title, body, userId: 1 };

        await baseLink.put(`/posts/${id}`, { body: post, });
        console.log(post);
    };

    useEffect(() => {
        getPost();
    }, []);
    
     
      
        return (
          <div className="new-post">
            <h2>Editando: {title}</h2>
            <form onSubmit={(e) => editPost(e)}>
              <div className="form-control">
                <label htmlFor="title">Título:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Título do post"
                  onChange={(e) => setTitle(e.target.value)}
                    value={title || ""} 
                />
              </div>
              <div className="form-control">
                <label htmlFor="title">Conteúdo:</label>
                <textarea
                  id="body"
                  name="body"
                  placeholder="Conteúdo do post"
                  onChange={(e) => setBody(e.target.value)}
                    value={body || ""}
                />
                <input type="submit" value="Editar Post" className="btn" />
              </div>
            </form>
          </div>
        );
      };

export default EditPost
