import { Link } from 'react-router-dom';
import semFoto from '../images/sem-foto.svg';
import '../styles/CardPessoa.css'; // Adicione o caminho correto para o CSS


const CardPessoa = ({ pessoa }) => {
const formatoData = (data) => {
    const partes = data.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  return (
    <div className="cardPessoa" key={pessoa.id}>
            <h2 className='status-pessoa'>{pessoa.ultimaOcorrencia?.dataLocalizacao === null ? "DESAPARECIDO" : "LOCALIZADO"}</h2>
        <div className='foto-container'>

      {!pessoa.urlFoto ? (
                    <img src={semFoto} alt="Imagem padrão" className="foto-pessoa" />
                  ) : (
                    <img src={pessoa.urlFoto} alt={`Foto de ${pessoa.nome}`} className="foto-pessoa"/>
                  )}
        </div>
<div>

      <p className='nome-pessoa'>{pessoa.nome}</p>
      <p className='infos-pessoa'>{pessoa.idade} anos, {pessoa.sexo}</p>
      <p className='infos-pessoa'>
        Local:{" "}
        {pessoa.ultimaOcorrencia?.localDesaparecimentoConcat || "Não informado"}
      </p>
        <p className='infos-pessoa'>
            Data:{" "}
            {pessoa.ultimaOcorrencia?.dtDesaparecimento ? formatoData(pessoa.ultimaOcorrencia?.dtDesaparecimento.split("T")[0]) : "Não informado"} 
        </p>
</div>

      <Link to={`/posts/${pessoa.id}`} className="btn">
        Mais Detalhes
      </Link>
    </div>
  );
};

export default CardPessoa;
