import React, { useState, useEffect } from 'react';
import baseLink from '../axios/config';
import CardPessoa from '../components/cardPessoa';
import './Home.css';
import lupaIcon from '../icons/busca.png';
import Pagination from '../components/Pagination';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [busca, setBusca] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);

  const getPessoas = async (nome = '', pagina = 1) => {
    try {
      let response;
  
      if (nome) {
        response = await baseLink.get('/v1/pessoas/aberto/filtro', {
          params: { nome },
        });
        setPosts(response.data.content);
        setTotalPaginas(1);
      } else {
        response = await baseLink.get('/v1/pessoas/aberto', {
          params: {
            pagina: pagina - 1,
            porPagina: 12,
            direcao: 'desc',
          },
        });
        setPosts(response.data.content);
        setTotalPaginas(response.data.totalPages);
      }
  
      setPaginaAtual(pagina);
    } catch (error) {
      console.error('Erro ao buscar pessoas:', error);
    }
  };

  useEffect(() => {
    getPessoas(); // busca inicial
  }, []);

  const handlePageClick = (pagina) => {
    getPessoas(busca, pagina);
  };

  return (
    <div className="home">
      <h2>
        <img className="icon-lupa" src={lupaIcon} alt="Lupa" />
        Buscar
      </h2>

      <div className="busca-container">
        <input
          type="text"
          placeholder="Buscar por nome..."
          className="campo-busca"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button
          className="botao-buscar"
          onClick={() => getPessoas(busca, 1)}
        >
          Buscar
        </button>
      </div>

      <div className="pessoas-grid">
        {posts.length === 0 ? (
          <p>Nenhuma pessoa encontrada</p>
        ) : (
          posts.map((pessoa) => (
            <CardPessoa key={pessoa.id} pessoa={pessoa} />
          ))
        )}
      </div>
      {totalPaginas > 1 && (
  <Pagination
    currentPage={paginaAtual}
    totalPages={totalPaginas}
    onPageChange={(pagina) => getPessoas(busca, pagina)}
  />
)}
    </div>
  );
};

export default Home;
