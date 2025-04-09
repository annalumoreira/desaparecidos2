import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import baseLink from "../axios/config";
import "./PessoaDetalhe.css";
import semFoto from "../images/sem-foto.svg";
import cracha from "../icons/icons8-crachá-48.png";
import { useLocation } from "react-router-dom";
import backIcon from "../icons/voltar.png";

const PessoaMaisInfo = () => {
  const { id } = useParams();

  const [informacao, setInformacao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [imagens, setImagens] = useState([]);
  const [previewImagens, setPreviewImagens] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const pessoaInicial = location.state?.pessoa;
  const [pessoa, setPessoa] = useState(pessoaInicial);

  const formatoData = (data) => {
    const partes = data.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  };

  useEffect(() => {
    const getPessoa = async () => {
      try {
        const response = await baseLink.get(`/v1/pessoas/${id}`);
        setPessoa(response.data);
      } catch (error) {
        console.log("Erro ao buscar detalhes:", error);
      }
    };

    getPessoa();
  }, [id]);

  const handleImagemChange = (e) => {
    const arquivos = Array.from(e.target.files);
    setImagens(arquivos);
    setPreviewImagens(arquivos.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pessoa?.ultimaOcorrencia?.ocoId) {
      alert("ID da ocorrência não encontrado.");
      return;
    }

    const formData = new FormData();
    formData.append("informacao", informacao);
    formData.append("descricao", descricao);
    formData.append("data", data);
    formData.append("ocoId", pessoa?.ultimaOcorrencia?.ocoId);

    imagens.forEach((img) => {
      formData.append("files", img);
    });

    try {
      await baseLink.post(
        "/v1/ocorrencias/informacoes-desaparecido",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Informações enviadas com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao enviar informações:", error);
      alert("Erro ao enviar informações.");
    }
  };

  return (
    <div>
      <div className="detalhes">
        {pessoa ? (
          <>
            {!pessoa?.urlFoto ? (
              <img
                src={semFoto}
                alt="Imagem padrão"
                className="detalhePessoaimg"
              />
            ) : (
              <img
                src={pessoa?.urlFoto}
                alt={`Foto de ${pessoa?.nome}`}
                className="detalhePessoaimg"
              />
            )}
            <div>
              <h2
                className={`statusDesaparecido ${
                  pessoa?.ultimaOcorrencia?.dataLocalizacao
                    ? "localizado"
                    : "desaparecido"
                }`}
              >
                {pessoa?.ultimaOcorrencia?.dataLocalizacao
                  ? "LOCALIZADO"
                  : "DESAPARECIDO"}
              </h2>

              <p className="titleDetalhes">
                <img src={cracha} alt="icone nome" className="iconsDetalhes" />
                Informações do Desaparecido
              </p>

              <h3 className="detalhePessoa-name">{pessoa?.nome}</h3>
              <p className="detalhePessoa">
                {pessoa?.idade} anos, {pessoa?.sexo}
              </p>
              <p className="detalhePessoa">
                Local do Desaparecimento:{" "}
                {pessoa?.ultimaOcorrencia?.localDesaparecimentoConcat ||
                  "Não informado"}
              </p>
              <p className="detalhePessoa">
                Data do Desaparecimento:{" "}
                {pessoa?.ultimaOcorrencia?.dtDesaparecimento
                  ? formatoData(
                      pessoa?.ultimaOcorrencia.dtDesaparecimento.split("T")[0]
                    )
                  : "Não informado"}
              </p>
              <p className="detalhePessoa">
                Vestimentas:{" "}
                {pessoa?.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO
                  ?.vestimentasDesaparecido || "Não informado"}
              </p>
              <p className="detalhePessoa">
                Informações Adicionais:{" "}
                {pessoa?.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO
                  ?.informacao || "Não informado"}
              </p>
              {pessoa?.ultimaOcorrencia?.dataLocalizacao && (
                <p className="detalhePessoa">
                  Data da Localização:{" "}
                  {formatoData(
                    pessoa?.ultimaOcorrencia.dataLocalizacao.split("T")[0]
                  )}
                </p>
              )}
            </div>
          </>
        ) : (
          <p>Carregando detalhes...</p>
        )}
      </div>

      {pessoa?.ultimaOcorrencia?.ocoId ? (
        <form className="formMaisInfo" onSubmit={handleSubmit}>
          <h3 style={{ marginTop: "2rem" }}>Enviar Novas Informações</h3>

          <label>Última localização *</label>
          <textarea
            value={informacao}
            onChange={(e) => setInformacao(e.target.value)}
            required
          />

          <label>Descrição da Imagem *</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />

          <label>Data da visualização *</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />

          <label>Imagens *</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImagemChange}
            required
          />

          {previewImagens.length > 0 && (
            <div className="grid-imagens-preview">
              {previewImagens.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`preview-${i}`}
                  className="preview-img"
                />
              ))}
            </div>
          )}
          <button type="submit" className="btn-enviar-info">
            Enviar Informações
          </button>
        </form>
      ) : (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          Carregando dados da ocorrência...
        </p>
      )}

      <div className="linhaBotoes">
        <button className="btn-voltar" onClick={() => navigate(-1)}>
          <img src={backIcon} alt="icone voltar" className="btn-voltar-icon" />
          Voltar
        </button>
      </div>
    </div>
  );
};

export default PessoaMaisInfo;
