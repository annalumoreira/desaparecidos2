import React, { useState, useEffect } from "react";
import baseLink from "../axios/config";
import CardPessoa from "../components/cardPessoa";
import "./Home.css";
import lupaIcon from "../icons/busca.png";
import Pagination from "../components/Pagination";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [busca, setBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [idadeInicial, setIdadeInicial] = useState("");
  const [idadeFinal, setIdadeFinal] = useState("");
  const [sexo, setSexo] = useState("");
  const [status, setStatus] = useState("");

  const getPessoas = async (nome = "", pagina = 1) => {
    try {
      const filtros = {
        nome,
        faixaIdadeInicial: idadeInicial || 0,
        faixaIdadeFinal: idadeFinal || 0,
        sexo: sexo || undefined,
        status: status || undefined,
        pagina: pagina - 1,
        porPagina: 12,
      };

      const response = await baseLink.get("/v1/pessoas/aberto/filtro", {
        params: filtros,
      });
      setPosts(response.data.content);
      setTotalPaginas(response.data.totalPages || 1);
      setPaginaAtual(pagina);
    } catch (error) {
      console.error("Erro ao buscar pessoas:", error);
    }
  };

  useEffect(() => {
    const filtrosSalvos = JSON.parse(localStorage.getItem("filtrosPessoas"));

    if (filtrosSalvos) {
      setBusca(filtrosSalvos.nome || "");
      setIdadeInicial(filtrosSalvos.faixaIdadeInicial || "");
      setIdadeFinal(filtrosSalvos.faixaIdadeFinal || "");
      setSexo(filtrosSalvos.sexo || "");
      setStatus(filtrosSalvos.status || "");
      getPessoas(filtrosSalvos.nome || "", 1);
    } else {
      getPessoas();
    }
  }, []);

  useEffect(() => {
    const filtros = {
      nome: busca,
      faixaIdadeInicial: idadeInicial,
      faixaIdadeFinal: idadeFinal,
      sexo,
      status,
    };
    localStorage.setItem("filtrosPessoas", JSON.stringify(filtros));
  }, [busca, idadeInicial, idadeFinal, sexo, status]);

  return (
    <div className="home">
      <h2>
        <img className="icon-lupa" src={lupaIcon} alt="Lupa" />
        Buscar
      </h2>
      <div className="filtros-container"></div>

      <div className="busca-container">
        <input
          type="text"
          placeholder="Buscar por nome..."
          className="campo-busca"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <input
          type="number"
          placeholder="Idade inicial"
          className="campo-busca"
          value={idadeInicial}
          onChange={(e) => setIdadeInicial(e.target.value)}
        />

        <input
          type="number"
          placeholder="Idade final"
          className="campo-busca"
          value={idadeFinal}
          onChange={(e) => setIdadeFinal(e.target.value)}
        />

        <select
          className="campo-busca"
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
        >
          <option value="">Sexo</option>
          <option value="MASCULINO">Masculino</option>
          <option value="FEMININO">Feminino</option>
        </select>

        <select
          className="campo-busca"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Status</option>
          <option value="DESAPARECIDO">Desaparecido</option>
          <option value="LOCALIZADO">Localizado</option>
        </select>

        <button className="botao-buscar" onClick={() => getPessoas(busca, 1)}>
          Buscar
        </button>
        <button
          className="botao-buscar"
          onClick={() => {
            setBusca("");
            setIdadeInicial("");
            setIdadeFinal("");
            setSexo("");
            setStatus("");
            localStorage.removeItem("filtrosPessoas");
            getPessoas("", 1);
          }}
        >
          Limpar Filtros
        </button>
      </div>

      <div className="pessoas-grid">
        {posts.length === 0 ? (
          <p>Nenhuma pessoa encontrada</p>
        ) : (
          posts.map((pessoa) => <CardPessoa key={pessoa.id} pessoa={pessoa} />)
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
