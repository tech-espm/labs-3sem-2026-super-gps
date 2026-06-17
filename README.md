# Laboratório Experimental - Sistemas de Informação ESPM

<p align="center">
    <a href="https://www.espm.br/cursos-de-graduacao/sistemas-de-informacao/"><img src="https://raw.githubusercontent.com/tech-espm/misc-template/main/logo.png" alt="Sistemas de Informação ESPM" style="width: 375px;"/></a>
</p>

# Super GPS

### 2026-01

## Visão Geral

O Super GPS é um sistema desenvolvido para acompanhar a localização das vans universitárias da ESPM em tempo quase real. As vans realizam o transporte dos alunos entre as estações de metrô e as unidades da faculdade, além do trajeto inverso, das unidades para o metrô.

O projeto surgiu a partir de uma ideia que já existia no LAB da ESPM, mas que estava dormente. A proposta foi revitalizada pelo grupo e transformada em uma aplicação funcional, permitindo o cadastro das vans, o envio da localização pelo motorista e a visualização das vans em um mapa pelos alunos.

## Participantes

- [Gustavo Santana](https://github.com/tec-guga)
- [Rafael Nascimento](https://github.com/tec-Rafael)
- [Pedro Veiga](https://github.com/pedro-veiga18)

## Objetivos do Projeto

O objetivo principal do projeto é melhorar a mobilidade universitária da ESPM por meio de uma solução simples e acessível para rastreamento das vans.

Principais objetivos:

- Permitir o acompanhamento da localização das vans em tempo quase real;
- Facilitar a organização dos alunos durante o deslocamento;
- Reduzir dúvidas sobre a posição das vans;
- Criar uma tela de mapa para visualização das vans ativas;
- Criar uma tela para o motorista iniciar o compartilhamento da localização;
- Permitir o cadastro, edição, listagem e exclusão de vans;
- Armazenar os registros de localização em banco de dados;
- Revitalizar e concluir uma ideia existente no LAB da ESPM.

## Configuração do Projeto

Para executar o projeto localmente, é necessário ter instalado:

- Node.js;
- npm;
- MySQL.

Após clonar o repositório, instale as dependências do projeto:

npm install

Em seguida, configure o banco de dados utilizando o script SQL disponível no projeto. Esse script cria as tabelas necessárias para o funcionamento do sistema.

Depois, ajuste as configurações de conexão com o banco de dados de acordo com o seu ambiente local, informando dados como host, porta, usuário, senha e nome do banco.

Com o banco configurado, compile o projeto TypeScript:

tsc

Depois, execute a aplicação.

Com o projeto em execução, acesse a aplicação pelo navegador utilizando o endereço local configurado, geralmente:

http://localhost:3000

## Mais Informações

O sistema utiliza Node.js, TypeScript, EJS, MySQL, Leaflet e OpenStreetMap.

A tela do motorista utiliza a geolocalização do navegador para capturar latitude e longitude. Por isso, é necessário permitir o acesso à localização no dispositivo utilizado.

A tela de mapa consulta periodicamente a API do sistema e exibe as vans com localização recente, permitindo que os usuários acompanhem o deslocamento das vans da ESPM.

# Licença

Este projeto é licenciado sob a [MIT License](https://github.com/tech-espm/labs-3sem-super-gps/blob/main/LICENSE).

<p align="right">
    <a href="https://www.espm.br/cursos-de-graduacao/sistemas-de-informacao/"><img src="https://raw.githubusercontent.com/tech-espm/misc-template/main/logo-si-512.png" alt="Sistemas de Informação ESPM" style="width: 375px;"/></a>
</p>
