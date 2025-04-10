# Projeto Prático - Processo Seletivo PSS 02/2025/SEPLAG
## Perfil: Desenvolvedor Front-end Júnior

- Este repositório contém a implementação do projeto prático de front-end exigido no processo seletivo PSS 02/2025/SEPLAG para o cargo de Analista de TI, perfil Desenvolvedor Front-end Júnior.

- ### Objetivo
   - O objetivo principal deste projeto é a construção de uma aplicação front-end capaz de:

   - Consultar dados de pessoas desaparecidas;

   - Visualizar informações detalhadas sobre um desaparecido;

   - Enviar novas informações sobre um desaparecido, incluindo fotos e localização.

   - A proposta visa demonstrar habilidades práticas de desenvolvimento web com foco em componentização, responsividade, consumo de APIs em tempo real, e organização do código.

- ### Tecnologias utilizadas
   - React.js

   - React Router DOM

   - Axios

   - CSS Modules


- ### Pré-requisitos do projeto prático:
 
    - Requisições feitas em tempo real usando Axios;

    - Componentização adequada;

    - Layout responsivo para diferentes tamanhos de tela;

    - Uso de Lazy Loading Routes;

    - Design limpo e organizado;


- ### Requisitos Específicos:
   - Tela Inicial

    - Listagem de desaparecidos ou localizados em cards com imagem e informações básicas;

    - Paginação dos resultados com 10 registros por página;

    - Possibilidade de pesquisa por nome e outros filtros disponíveis nos endpoints.

   - Tela de Detalhamento

    - Redirecionamento ao clicar em um desaparecido;

    - Exibição de informações detalhadas;

    - Estilização que destaque claramente o status da pessoa (desaparecida ou localizada).

   - Tela de Inclusão de Informações

    - Permitir ao cidadão enviar informações adicionais sobre o desaparecido;

    - Aplicação de máscaras e validações nos campos;

    - Possibilidade de envio de imagens;

    - Campo de localização e data da visualização;

- ### API de Dados
- Os dados consumidos nesta aplicação estão disponíveis em tempo real através dos endpoints documentados via Swagger:

🔗 [Documentação da API - Swagger](https://abitus-api.geia.vip/swagger-ui/index.html#/)

- ### Instruções para execução
- Clone o repositório:
   - git clone [https://github.com/seu-usuario/repositorio-nome.git](https://github.com/annalumoreira/desaparecidos2)
   - cd desaparecidos
     
- Instale as dependências:
   - npm install
    
- Inicie a aplicação:
   - npm run dev
