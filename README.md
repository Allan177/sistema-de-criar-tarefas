
Plataforma de Grupos de Estudo - API Backend

![alt text](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js)
![alt text](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![alt text](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express)
![alt text](https://img.shields.io/badge/Prisma-5.x-2D3748?style=for-the-badge&logo=prisma)
![alt text](https://img.shields.io/badge/PostgreSQL-14-336791?style=for-the-badge&logo=postgresql)

API RESTful desenvolvida como o backend para uma plataforma de estudos colaborativa. O objetivo é permitir que alunos criem grupos, gerenciem tarefas e interajam de forma organizada, promovendo o aprendizado coletivo.

Tabela de Conteúdos

Sobre o Projeto

Tecnologias Utilizadas

Arquitetura e Padrões de Projeto

Model-View-Controller (MVC)

Padrão Repository

Padrão Service Layer (Camada de Serviço)

Injeção de Dependência (Dependency Injection)

Começando

Pré-requisitos

Instalação

Uso da API

Criar um novo usuário

Criar um novo grupo

Estrutura de Pastas

Sobre o Projeto

Este backend foi idealizado para ser o cérebro de uma plataforma digital que visa combater o baixo rendimento acadêmico através da colaboração. A ideia central é fornecer uma ferramenta onde os próprios alunos possam criar grupos de estudo, convidar colegas, atribuir e gerenciar tarefas de forma autônoma e descentralizada.

A API é responsável por toda a lógica de negócio, gerenciamento de dados e incluindo:

Criação e gerenciamento de grupos e seus membros.

Tecnologias Utilizadas

A seleção de tecnologias foi pensada para garantir um desenvolvimento moderno, escalável e de fácil manutenção.

Node.js: Ambiente de execução que nos permite rodar TypeScript no lado do servidor.

TypeScript: Adiciona tipagem estática ao JavaScript, tornando o código mais robusto, legível e menos propenso a erros em tempo de execução.

Express.js: Framework minimalista para Node.js, usado para construir nossa API RESTful, gerenciar rotas e middlewares de forma eficiente.

Prisma: ORM (Object-Relational Mapper) moderno que simplifica drasticamente a interação com o banco de dados, gera tipos seguros a partir do schema e facilita as migrações.

PostgreSQL: Um dos sistemas de gerenciamento de banco de dados relacional mais poderosos e confiáveis do mercado, ideal para a estrutura de dados relacional do nosso projeto.

TSyringe: Um contêiner de Injeção de Dependência leve para TypeScript, essencial para desacoplar os componentes da nossa aplicação e facilitar os testes.

BcryptJS: Biblioteca para fazer o hash de senhas, garantindo que elas sejam armazenadas de forma segura no banco de dados.

Dotenv: Módulo para carregar variáveis de ambiente a partir de um arquivo .env, mantendo dados sensíveis (como a URL do banco) fora do código-fonte.

Arquitetura e Padrões de Projeto

Para garantir que a aplicação seja organizada, testável e escalável, adotamos uma arquitetura modularizada com base em diversos padrões de projeto consolidados.

Model-View-Controller (MVC)

O conceito de MVC foi adaptado para nossa API REST:

Model: Representado pelo Schema do Prisma (prisma/schema.prisma). Ele define a estrutura dos nossos dados (User, Group, Task, etc.) e suas relações.

View: A "visão" em nossa API é a resposta JSON enviada ao cliente. Os Controllers são responsáveis por formatar e enviar essa resposta.

Controller: Responsável por receber as requisições HTTP, validar os dados e orquestrar a resposta. Eles são a porta de entrada da nossa aplicação.

Onde é usado: Nos arquivos *.controller.ts de cada módulo (ex: src/modules/users/user.controller.ts). A UserController manipula as rotas /users.

Padrão Repository

Este padrão abstrai e isola a camada de acesso aos dados. O resto da aplicação não precisa saber como as queries são executadas, apenas que existem métodos para buscar ou salvar dados.

Como é usado: Criamos uma classe de repositório para cada entidade.

Exemplo: A classe GroupsRepository (src/modules/groups/group.repository.ts) contém o método create, que é o único local que interage diretamente com o prisma.group para criar um novo grupo e adicionar seu primeiro membro. Isso centraliza a lógica de banco de dados e facilita os testes.

Padrão Service Layer (Camada de Serviço)

A camada de serviço fica entre os Controllers e os Repositórios e contém toda a lógica de negócio da aplicação.

Como é usado: Cada módulo possui sua classe de serviço.

Exemplo: No UserService (src/modules/users/user.service.ts), o método create implementa a regra de negócio de verificar se um e-mail já existe e de realizar o hash da senha antes de chamar o repositório para salvar o usuário.

Injeção de Dependência (Dependency Injection)

Em vez de uma classe criar suas próprias dependências, elas são "injetadas" de fora por um contêiner. Isso desacopla fortemente nossos componentes, melhora a modularidade e é fundamental para a testabilidade.

Como é usado: Utilizamos a biblioteca TSyringe.

Registro: No arquivo src/shared/container/index.ts, registramos nossas implementações (UsersRepository, GroupsRepository).

Injeção: Nas classes de serviço, usamos os decoradores @injectable() e @inject('UsersRepository') no construtor para receber as dependências automaticamente, sem precisar instanciá-las manualmente.

Começando

Siga estas instruções para obter uma cópia do projeto e executá-lo em sua máquina local.

Pré-requisitos

Node.js (versão 18.x ou superior)

NPM ou Yarn

Uma instância de um banco de dados PostgreSQL em execução.

Instalação

Clone o repositório:

code
Bash
download
content_copy
expand_less

git clone https://github.com/Allan177/sistema-de-criar-tarefas.git
cd bd_e_pp-backend

Instale as dependências:

code
Bash
download
content_copy
expand_less
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END
npm install

Configure as variáveis de ambiente:

Crie uma cópia do arquivo .env.example (se houver) ou crie um novo arquivo chamado .env na raiz do projeto.

Abra o arquivo .env e adicione a URL de conexão do seu banco de dados PostgreSQL.

code
Env
download
content_copy
expand_less
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END
# URL de conexão do seu banco de dados PostgreSQL
DATABASE_URL="postgresql://neondb_owner:npg_ZPtb16jUlfaA@ep-delicate-bush-acd8lexz-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Porta em que a API será executada
PORT=3333

Execute as migrações do Prisma:
Este comando irá ler seu schema.prisma e criar todas as tabelas no banco de dados.

code
Bash
download
content_copy
expand_less
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END
npx prisma migrate dev --name init

Inicie o servidor de desenvolvimento:

code
Bash
download
content_copy
expand_less
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END
npm run dev

O servidor estará em execução em http://localhost:3333.

Uso da API

A seguir, exemplos de como interagir com os endpoints já implementados.

Criar um novo usuário

Endpoint: POST /api/v1/users

Descrição: Registra um novo usuário no sistema.

Corpo da Requisição (Body):

code
JSON
download
content_copy
expand_less
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END
{

    "name": "Estudante Exemplo",

    "email": "estudante@email.com",

    "password": "senhaSegura123"
}

Resposta de Sucesso (201 Created):

code
JSON
download
content_copy
expand_less
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END
{

    "id": 1,

    "name": "Estudante Exemplo",

    "email": "estudante@email.com",

    "createdAt": "2025-08-21T18:30:00.000Z"
}
Criar um novo grupo

Endpoint: POST /api/v1/groups

Descrição: Cria um novo grupo de estudos. O usuário que cria o grupo é automaticamente adicionado como o primeiro membro.

Corpo da Requisição (Body): É necessário que o createdBy seja um ID de um usuário existente.

code
JSON
download
content_copy
expand_less
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END
{

    "name": "Grupo de Estudos de Algoritmos",

    "createdBy": 1 
}

Resposta de Sucesso (201 Created):

code
JSON
download
content_copy
expand_less
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END
{

    "id": 1,

    "name": "Grupo de Estudos de Algoritmos",

    "createdBy": 1,

    "createdAt": "2025-08-21T18:35:00.000Z",

    "users": [
        {
            "groupId": 1,
            "userId": 1
        }
    ]
}
Estrutura de Pastas
code
Code
download
content_copy
expand_less
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END

.
├── prisma/
│   └── schema.prisma         # Definição do banco de dados (Models)
├── src/
│   ├── modules/              # Contêineres para cada recurso da aplicação
│   │   ├── users/            # Exemplo de um módulo
│   │   │   ├── user.controller.ts
│   │   │   ├── user.repository.ts
│   │   │   ├── user.routes.ts
│   │   │   └── user.service.ts
│   │   └── groups/
│   ├── shared/               # Código compartilhado entre os módulos
│   │   ├── container/        # Configuração da Injeção de Dependência (TSyringe)
│   │   ├── database/         # Conexão com o banco (Prisma)
│   │   └── http/             # Configuração do Express (app, server, rotas)
│   └── ...
├── .env                      # Variáveis de ambiente (NÃO versionar)
├── package.json
└── tsconfig.json