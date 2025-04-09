import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseLink from "../axios/config";
import "./PessoaDetalhe.css"; // cria esse CSS se quiser estilizar
import semFoto from "../images/sem-foto.svg"; // Importa a imagem padrão
import cracha from "../icons/icons8-crachá-48.png"; // I
import editIcon from "../icons/megafone.png"; // Ícone de editar
import backIcon from "../icons/voltar.png"; // Ícone de voltar
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate


const PessoaDetalhes = () => {
  const { id } = useParams();
  const [pessoa, setPessoa] = useState(null);
  const navigate = useNavigate();

  const handleIrParaMaisInfo = () => {
    navigate(`/pessoa/${pessoa.id}/mais-info`, { state: { pessoa } });
  };

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
  

  return (
    <div>
      <div className="detalhes">
        {pessoa ? (
          <>
            {!pessoa?.urlFoto ? (
              <img src={semFoto} alt="Imagem padrão" className="detalhePessoaimg"/>
            ) : (
              <img
                src={pessoa?.urlFoto}
                alt={`Foto de ${pessoa?.nome}`}
                className="detalhePessoaimg"
              />
            )}
            <div>
              <p>
              <h2
  className={`statusDesaparecido ${
    pessoa?.ultimaOcorrencia?.dataLocalizacao ? "localizado" : "desaparecido"
  }`}
>
  {pessoa?.ultimaOcorrencia?.dataLocalizacao ? "LOCALIZADO" : "DESAPARECIDO"}
</h2>
                <p className="titleDetalhes">

              <img src={cracha} alt="icone nome" className="iconsDetalhes" />
              Informações do Desaparecido
                </p>
              </p>
              <h3 className="detalhePessoa-name">
               
               {pessoa?.nome}
              </h3>
              <p className="detalhePessoa">
              
              {pessoa?.idade} anos, {pessoa?.sexo}</p>
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
      <div className="linhaBotoes">
        <button className="btn-voltar" onClick={() => navigate("/")}>
          <img src={backIcon} alt="icone voltar" className="btn-voltar-icon"/>
          Voltar</button>
        {pessoa?.ultimaOcorrencia?.dataLocalizacao === null && (
        <button className="btnMaisInfos"  onClick={() => navigate(`/v1/ocorrencias/informacoes-desaparecido?ocorrenciaId=${pessoa?.ultimaOcorrencia?.ocoId}`)}>
        <img src={editIcon} alt="icone nome" className="btnMaisInfos-icon"/>
          Tenho mais informações!</button>
          )}
      </div>
    </div>
  );
};

export default PessoaDetalhes;
