import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import baseLink from '../axios/config'
import './PessoaDetalhe.css' // cria esse CSS se quiser estilizar

const PessoaDetalhes = () => {
  const { id } = useParams()
  const [pessoa, setPessoa] = useState(null)

  const getPessoa = async () => {
    try {
      const response = await baseLink.get(`/v1/pessoas/${id}`)
      setPessoa(response.data)
    } catch (error) {
      console.log('Erro ao buscar detalhes:', error)
    }
  }

  useEffect(() => {
    getPessoa()
  }, [id])

  return (
    <div className='detalhes'>
      {pessoa ? (
        <>
          <h1>{pessoa.nome}</h1>
          <p><strong>CPF:</strong> {pessoa.cpf}</p>
          <p><strong>Idade:</strong> {pessoa.idade}</p>
          <p><strong>Sexo:</strong> {pessoa.sexo}</p>
          <p><strong>Naturalidade:</strong> {pessoa.naturalidade}</p>
          {/* Adicione mais campos conforme o retorno da API */}
        </>
      ) : (
        <p>Carregando detalhes...</p>
      )}
    </div>
  )
}

export default PessoaDetalhes
