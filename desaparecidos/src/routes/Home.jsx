// Home.jsx
import React, { useState, useEffect } from 'react';
import baseLink from '../axios/config';
import CardPessoa from '../components/cardPessoa';
import './Home.css';
import lupaIcon from '../icons/lupa.svg'; // Importa o ícone da lupa

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [busca, setBusca] = useState('');

  const getPessoas = async (nome = '') => {
    try {
      let response;

      if (nome) {
        // Usa o endpoint de filtro com busca por nome
        response = await baseLink.get('/v1/pessoas/aberto/filtro', {
          params: { nome },
        });
        setPosts(response.data.content); // Se o filtro retorna um array direto
      } else {
        // Usa o endpoint padrão
        response = await baseLink.get('/v1/pessoas/aberto', {
          params: {
            pagina: 0,
            porPagina: 40,
            direcao: 'desc',
          },
        });
        setPosts(response.data.content);
      }
    } catch (error) {
      console.error('Erro ao buscar pessoas:', error);
    }
  };

  useEffect(() => {
    getPessoas(); // busca inicial
  }, []);

  return (
    <div className="home">
      <h2 >
        <img className="icon-lupa" src={lupaIcon} alt="Lupa" />
        Buscar</h2>

      <div className="px-4 mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Buscar por nome..."
          className="w-full border border-gray-300 rounded px-3 py-2 shadow-sm"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          onClick={() => getPessoas(busca)}
        >
          Buscar
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {posts.length === 0 ? (
          <p>Nenhuma pessoa encontrada</p>
        ) : (
          posts.map((pessoa) => (
            <CardPessoa key={pessoa.id} pessoa={pessoa} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
