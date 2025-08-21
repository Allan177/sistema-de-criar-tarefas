
Plataforma de Grupos de Estudo - API Backend

![alt text](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js)
![alt text](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![alt text](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express)
![alt text](https://img.shields.io/badge/Prisma-5.x-2D3748?style=for-the-badge&logo=prisma)
![alt text](https://img.shields.io/badge/PostgreSQL-14-336791?style=for-the-badge&logo=postgresql)

API RESTful desenvolvida como o backend para uma plataforma de estudos colaborativa. O objetivo é permitir que alunos criem e gerenciem grupos, usuários e tarefas de forma organizada, promovendo o aprendizado coletivo.

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

Uso da API (Endpoints)

Endpoints de Usuários (/api/v1/users)

Endpoints de Grupos (/api/v1/groups)

Estrutura de Pastas

Sobre o Projeto

Este backend foi idealizado para ser o cérebro de uma plataforma digital que visa combater o baixo rendimento acadêmico através da colaboração. A ideia central é fornecer uma ferramenta onde os próprios alunos possam criar grupos de estudo, convidar colegas, atribuir e gerenciar tarefas de forma autônoma e descentralizada.

A API é responsável por toda a lógica de negócio, gerenciamento de dados e segurança, incluindo o CRUD (Create, Read, Update, Delete) completo para os principais recursos da aplicação:

Usuários: Cadastro, listagem, busca, atualização e remoção de usuários.

Grupos: Criação, listagem, busca, atualização e remoção de grupos de estudo.

Tecnologias Utilizadas

Node.js: Ambiente de execução que nos permite rodar TypeScript no lado do servidor.

TypeScript: Adiciona tipagem estática ao JavaScript, tornando o código mais robusto, legível e menos propenso a erros.

Express.js: Framework minimalista para construir nossa API RESTful, gerenciar rotas e middlewares de forma eficiente.

Prisma: ORM (Object-Relational Mapper) moderno que simplifica drasticamente a interação com o banco de dados, gera tipos seguros e facilita as migrações.

PostgreSQL: Sistema de gerenciamento de banco de dados relacional poderoso e confiável, ideal para a estrutura de dados do nosso projeto.

TSyringe: Contêiner de Injeção de Dependência leve para TypeScript, essencial para desacoplar os componentes da nossa aplicação.

BcryptJS: Biblioteca para fazer o hash de senhas, garantindo que elas sejam armazenadas de forma segura.

Dotenv: Módulo para carregar variáveis de ambiente a partir de um arquivo .env.

Arquitetura e Padrões de Projeto

Para garantir que a aplicação seja organizada, testável e escalável, adotamos uma arquitetura modularizada com base em diversos padrões de projeto. Cada padrão foi escolhido para resolver um problema específico e trazer benefícios claros.

Model-View-Controller (MVC)

O conceito de MVC foi adaptado para a nossa API REST, onde a principal função é a separação de responsabilidades.

Model: Representado pelo Schema do Prisma (prisma/schema.prisma). Ele define a estrutura dos nossos dados (User, Group, etc.) e é a única fonte da verdade sobre as entidades do banco.

View: A "visão" da nossa API é a resposta JSON enviada ao cliente.

Controller: Responsável por ser a ponte entre o mundo HTTP e a lógica da aplicação. Ele recebe as requisições, extrai dados (body, params, query), chama o Service apropriado e formata a resposta JSON.

Benefício: Mantém a lógica de HTTP (rotas, status codes, validação de entrada) completamente separada da lógica de negócio, tornando o código mais limpo e focado.

Padrão Repository

Este padrão cria uma ponte de abstração entre a lógica de negócio (Services) e a fonte de dados (banco de dados). Ele evita que a lógica de negócio se misture com a forma de acessar os dados (queries do Prisma).

Como é usado: Cada entidade (User, Group) possui sua própria classe de Repositório (ex: UsersRepository) que contém todos os métodos para interagir com o banco (create, findById, delete, etc.).

Benefício Principal (Testabilidade): Este padrão é crucial para os testes. Nos testes unitários de um Service, podemos facilmente "mockar" (simular) o repositório, testando a lógica de negócio em isolamento, sem a necessidade de uma conexão real com o banco de dados.

Benefício Secundário (Manutenção): Se um dia precisarmos otimizar uma query ou trocar de ORM, a alteração é feita em um único lugar (o repositório), sem impactar os Services que o utilizam.

Padrão Service Layer (Camada de Serviço)

É o coração da lógica de negócio da aplicação. Fica entre os Controllers e os Repositórios e orquestra as operações.

Como é usado: Cada entidade possui sua classe de Serviço (ex: UserService). O UserService é chamado pelo UserController e, por sua vez, chama os métodos do UsersRepository (ou de outros repositórios, se necessário).

Benefício (Lógica de Negócio Centralizada): Regras complexas vivem aqui. Por exemplo, no UserService, antes de criar um usuário, ele verifica se o e-mail já existe. Antes de atualizar, ele verifica se o novo e-mail não pertence a outro usuário. Isso impede que os Controllers fiquem "inchados" (Fat Controllers) e que regras de negócio vazem para outras camadas.

Benefício (Reusabilidade): A mesma lógica de serviço pode ser reutilizada por diferentes interfaces no futuro (ex: uma API para um app mobile, um painel admin, etc.), pois ela não está acoplada ao Express.

Injeção de Dependência (Dependency Injection)

É o padrão que "cola" todas as nossas camadas de forma desacoplada. Em vez de uma classe criar suas próprias dependências (ex: const repo = new UsersRepository() dentro do UserService), elas são "injetadas" de fora por um contêiner.

Como é usado: Utilizamos a biblioteca TSyringe.

Registro: No arquivo src/shared/container/index.ts, informamos ao contêiner como resolver as dependências (ex: "quando alguém pedir por IUsersRepository, entregue uma instância de UsersRepository").

Injeção: Nas classes de serviço, usamos @injectable() e @inject('UsersRepository') no construtor para receber as dependências.

Benefício (Desacoplamento e Testabilidade): Este é o padrão que torna os outros realmente eficazes para testes. Como o UserService recebe o repositório no construtor, nos testes, podemos facilmente injetar um MockUsersRepository no lugar do real. Isso quebra as dependências diretas entre as classes, tornando o código modular, flexível e extremamente testável.

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
cd sistema-de-criar-tarefas

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

Crie um arquivo chamado .env na raiz do projeto.

Adicione a URL de conexão do seu banco de dados e a porta da aplicação.

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

Uso da API (Endpoints)

A seguir, a documentação do CRUD completo para os recursos implementados.

Endpoints de Usuários (/api/v1/users)

Listar todos os usuários

Endpoint: GET /api/v1/users

Descrição: Retorna uma lista de todos os usuários cadastrados (sem a senha).

Buscar um usuário por ID

Endpoint: GET /api/v1/users/:id

Descrição: Retorna os detalhes de um usuário específico, incluindo os grupos dos quais ele faz parte e as tarefas pelas quais é responsável.

Criar um novo usuário

Endpoint: POST /api/v1/users

Descrição: Registra um novo usuário no sistema.

Corpo da Requisição: { "name": "...", "email": "...", "password": "..." }

Atualizar um usuário

Endpoint: PUT /api/v1/users/:id

Descrição: Atualiza os dados de um usuário (nome, e-mail e/ou senha).

Corpo da Requisição: { "name": "Novo Nome", "email": "novo@email.com" }

Deletar um usuário

Endpoint: DELETE /api/v1/users/:id

Descrição: Remove um usuário do sistema. Retorna status 204 No Content em caso de sucesso.

Endpoints de Grupos (/api/v1/groups)

Listar todos os grupos

Endpoint: GET /api/v1/groups

Descrição: Retorna uma lista de todos os grupos, incluindo os dados do criador e a contagem de membros.

Buscar um grupo por ID

Endpoint: GET /api/v1/groups/:id

Descrição: Retorna os detalhes de um grupo específico, incluindo a lista de membros e as tarefas associadas.

Criar um novo grupo

Endpoint: POST /api/v1/groups

Descrição: Cria um novo grupo. O usuário criador é automaticamente adicionado como o primeiro membro.

Corpo da Requisição: { "name": "...", "createdBy": ID_DO_USUARIO }

Atualizar um grupo

Endpoint: PUT /api/v1/groups/:id

Descrição: Atualiza o nome de um grupo.

Corpo da Requisição: { "name": "Novo Nome do Grupo" }

Deletar um grupo

Endpoint: DELETE /api/v1/groups/:id

Descrição: Remove um grupo do sistema. Retorna status 204 No Content em caso de sucesso.

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
│   │   └── groups/
│   ├── shared/               # Código compartilhado entre os módulos
│   │   ├── container/        # Configuração da Injeção de Dependência
│   │   ├── database/         # Conexão com o banco (Prisma)
│   │   └── http/             # Configuração do Express (app, server, rotas)
│   └── ...
├── .env                      # Variáveis de ambiente (NÃO versionar)
├── package.json
└── tsconfig.json