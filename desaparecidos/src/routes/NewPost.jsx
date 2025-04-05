import React from 'react'
import "./NewPost.css"
import baseLink from '../axios/config'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const NewPost = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

const createPost = async (e) => {
  e.preventDefault();

  const post = { title, body, userId: 1 };

  await baseLink.post('/posts', {body: post})
  console.log(post)
 
navigate('/')
};

  return (
    <div className='new-post'>
     <h2>Inserir novo post:</h2>
     <form onSubmit={(e) => createPost(e)}>
      <div className='form-control'>
        <label htmlFor="title">Título:</label>
        <input 
        type="text" 
        id='title' 
        name='title' 
        placeholder='Título do post' 
        onChange={(e) => setTitle(e.target.value)}/>
      </div>
      <div className='form-control'>
        <label htmlFor="title">Conteúdo:</label>
        <textarea 
        id='body' 
        name='body' 
        placeholder='Conteúdo do post' 
        onChange={(e) => setBody(e.target.value)} />
        <input 
        type='submit' 
        value='Criar Post' 
        className='btn' />
      </div>
     </form>
    </div>
    
  )
}

export default NewPost
