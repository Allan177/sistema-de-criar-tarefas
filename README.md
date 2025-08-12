Plataforma de Grupos de Estudo - API Backend
![alt text](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js)
![alt text](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![alt text](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express)
![alt text](https://img.shields.io/badge/Prisma-5.x-2D3748?style=for-the-badge&logo=prisma)
![alt text](https://img.shields.io/badge/PostgreSQL-14-336791?style=for-the-badge&logo=postgresql)
API RESTful desenvolvida para dar suporte a uma plataforma de estudos colaborativa, permitindo que alunos criem grupos, gerenciem tarefas e interajam de forma organizada.
Tabela de Conteúdos
Sobre o Projeto
Tecnologias Utilizadas
Arquitetura e Padrões de Projeto
Model-View-Controller (MVC)
Padrão Repository
Padrão Service Layer (Camada de Serviço)
Injeção de Dependência (Dependency Injection)
Padrão Observer (Planejado)
Começando
Pré-requisitos
Instalação
Uso da API
Criar um novo usuário
Estrutura de Pastas
Sobre o Projeto
Este backend foi idealizado para ser o cérebro de uma plataforma digital que visa combater o baixo rendimento acadêmico através da colaboração. A ideia central é fornecer uma ferramenta onde os próprios alunos possam criar grupos de estudo, convidar colegas, atribuir e gerenciar tarefas de forma autônoma e descentralizada.
A API é responsável por toda a lógica de negócio, gerenciamento de dados e segurança, incluindo:
Cadastro e autenticação de usuários.
Criação e gerenciamento de grupos.
Criação, atribuição e atualização de tarefas.
Sistema de comentários e notificações.
Tecnologias Utilizadas
A seleção de tecnologias foi pensada para garantir um desenvolvimento moderno, escalável e de fácil manutenção.
Node.js: Ambiente de execução que nos permite rodar JavaScript/TypeScript no lado do servidor.
TypeScript: Superset do JavaScript que adiciona tipagem estática, tornando o código mais robusto, legível e menos propenso a erros.
Express.js: Framework minimalista para Node.js, usado para construir nossa API RESTful, gerenciar rotas e middlewares.
Prisma: ORM (Object-Relational Mapper) de próxima geração para Node.js e TypeScript. Ele simplifica a interação com o banco de dados, gera tipos seguros a partir do schema e facilita as migrações.
PostgreSQL: Um dos sistemas de gerenciamento de banco de dados relacional mais poderosos e confiáveis do mercado.
TSyringe: Um contêiner de Injeção de Dependência leve para TypeScript, que nos ajuda a desacoplar os componentes da nossa aplicação.
BcryptJS: Biblioteca para fazer o hash de senhas, garantindo que elas sejam armazenadas de forma segura no banco de dados.
Dotenv: Módulo para carregar variáveis de ambiente a partir de um arquivo .env, mantendo dados sensíveis fora do código-fonte.
Arquitetura e Padrões de Projeto
Para garantir que a aplicação seja organizada, testável e escalável, adotamos uma arquitetura modularizada com base em diversos padrões de projeto consolidados.
Model-View-Controller (MVC)
Embora tradicionalmente associado a aplicações web completas, o conceito de MVC foi adaptado para nossa API REST:
Model: Representado pelo Schema do Prisma (prisma/schema.prisma). Ele define a estrutura dos nossos dados, suas relações e serve como a única fonte da verdade para o formato das entidades.
View: A "visão" em nossa API é a resposta JSON enviada ao cliente. Os Controllers são responsáveis por formatar e enviar essa resposta.
Controller: Responsável por receber as requisições HTTP, validar os dados de entrada e orquestrar a resposta. Eles são a porta de entrada da nossa aplicação.
Onde está sendo usado: Nos arquivos *.controller.ts dentro de cada módulo (ex: src/modules/users/user.controller.ts). A UserController manipula as rotas /users.
Padrão Repository
Este padrão abstrai a camada de acesso aos dados. Ele isola a lógica de como as queries são executadas, permitindo que o resto da aplicação não precise saber se estamos usando Prisma, SQL puro ou outro ORM.
Como está sendo usado: Criamos uma classe de repositório para cada entidade do nosso banco de dados.
Exemplo: A classe UsersRepository (src/modules/users/user.repository.ts) contém métodos como create, findByEmail, etc. Ela é a única que interage diretamente com o cliente Prisma para operações relacionadas a usuários. Isso torna nossos testes muito mais fáceis, pois podemos "mockar" (simular) o repositório.
Padrão Service Layer (Camada de Serviço)
A camada de serviço fica entre os Controllers e os Repositórios e contém toda a lógica de negócio da aplicação. Se uma ação envolve múltiplas etapas ou regras complexas, ela pertence a um Service.
Como está sendo usado: Cada módulo possui sua classe de serviço.
Exemplo: UserService (src/modules/users/user.service.ts) no método create verifica se o e-mail já existe (regra de negócio) e realiza o hash da senha antes de chamar o UsersRepository para salvar o usuário. Ele orquestra as operações.
Injeção de Dependência (Dependency Injection)
Em vez de uma classe criar suas próprias dependências (ex: const repo = new UsersRepository()), elas são "injetadas" de fora. Isso desacopla fortemente nossos componentes, melhora a modularidade e é fundamental para a testabilidade.
Como está sendo usado: Utilizamos a biblioteca TSyringe.
Registro: No arquivo src/shared/container/index.ts, nós registramos quais implementações concretas (UsersRepository) devem ser usadas quando uma interface (IUsersRepository) for solicitada.
Injeção: Nas classes de serviço, usamos os decoradores @injectable() (para marcar a classe como injetável) e @inject('UsersRepository') no construtor para receber a dependência automaticamente, sem precisar instanciá-la.
Padrão Observer (Planejado)
Este padrão será usado para criar um sistema de notificações desacoplado. Quando uma ação importante ocorre (o "Subject"), múltiplos "Observers" são notificados sem que o Subject precise conhecê-los.
Como será usado: Usaremos o EventEmitter nativo do Node.js.
Exemplo: Quando o TaskService criar uma nova tarefa, ele emitirá um evento (task.created). Uma classe NotificationListener (o Observer) estará ouvindo esse evento e, ao recebê-lo, criará uma notificação no banco de dados para o usuário responsável, sem que o TaskService precise saber da existência do sistema de notificações.
Começando
Siga estas instruções para obter uma cópia do projeto e executá-lo em sua máquina local para desenvolvimento e testes.
Pré-requisitos
Node.js (versão 18.x ou superior)
NPM ou Yarn
Uma instância de um banco de dados PostgreSQL em execução.
Instalação
Clone o repositório:
code
Bash
git clone https://seu-repositorio-aqui/bd_e_pp-backend.git
cd bd_e_pp-backend
Instale as dependências:
code
Bash
npm install
Configure as variáveis de ambiente:
Crie uma cópia do arquivo .env.example e renomeie-a para .env.
code
Bash
# No Windows (PowerShell)
copy .env.example .env

# No Linux/macOS
cp .env.example .env
Abra o arquivo .env e preencha com as suas credenciais do banco de dados PostgreSQL.
code
Env
# Exemplo
DATABASE_URL="postgresql://docker:docker@localhost:5432/meu_banco?schema=public"
PORT=3333
Execute as migrações do Prisma:
Este comando irá ler seu schema.prisma e criar todas as tabelas no banco de dados configurado no passo anterior.
code
Bash
npx prisma migrate dev --name init
Inicie o servidor de desenvolvimento:
code
Bash
npm run dev
O servidor estará em execução em http://localhost:3333.
Uso da API
A seguir, um exemplo de como interagir com a API.
Criar um novo usuário
Endpoint: POST /api/v1/users
Descrição: Registra um novo usuário no sistema.
Corpo da Requisição (Body):
code
JSON
{
    "name": "Estudante Dedicado",
    "email": "estudante@email.com",
    "password": "senhaSegura123"
}
Resposta de Sucesso (201 Created):
code
JSON
{
    "id": 1,
    "name": "Estudante Dedicado",
    "email": "estudante@email.com",
    "createdAt": "2025-08-12T15:00:00.000Z"
}
Resposta de Erro (400 Bad Request):
code
JSON
{
    "message": "Email address already used."
}
Estrutura de Pastas
code
Code
.
├── prisma/
│   └── schema.prisma         # Definição do banco de dados
├── src/
│   ├── modules/              # Onde cada recurso da aplicação vive
│   │   └── users/
│   │       ├── user.controller.ts
│   │       ├── user.dtos.ts
│   │       ├── user.repository.ts
│   │       ├── user.routes.ts
│   │       └── user.service.ts
│   ├── shared/               # Código compartilhado entre os módulos
│   │   ├── container/        # Configuração da Injeção de Dependência
│   │   ├── database/         # Conexão com o banco (Prisma)
│   │   └── http/             # Configuração do Express (app, server, rotas)
│   └── ...
├── .env                      # Variáveis de ambiente (secretas)
├── package.json
└── tsconfig.json#   s i s t e m a - d e - c r i a r - t a r e f a s  
 