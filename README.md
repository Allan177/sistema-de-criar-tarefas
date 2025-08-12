
📚 Plataforma de Grupos de Estudo - API Backend






API RESTful para gerenciar grupos de estudo, tarefas e interações entre alunos, proporcionando uma organização colaborativa e autônoma.

📑 Sumário
Sobre o Projeto

Tecnologias

Arquitetura

Instalação

Uso da API

Estrutura de Pastas

🚀 Sobre o Projeto
Este backend é o núcleo de uma plataforma voltada para colaboração acadêmica.
Funcionalidades principais:

Cadastro e autenticação de usuários

Criação e gerenciamento de grupos

Criação, atribuição e atualização de tarefas

Sistema planejado de comentários e notificações

🛠 Tecnologias
Node.js – Ambiente de execução JavaScript/TypeScript

TypeScript – Tipagem estática para código mais robusto

Express.js – Framework web minimalista

Prisma – ORM moderno para PostgreSQL

PostgreSQL – Banco de dados relacional

TSyringe – Injeção de dependência

BcryptJS – Hash de senhas

Dotenv – Variáveis de ambiente

🏗 Arquitetura
MVC – Controllers recebem requisições, Services processam regras de negócio, Repositories cuidam do acesso a dados

Repository Pattern – Abstração de acesso ao banco

Service Layer – Centralização da lógica de negócio

Dependency Injection – Componentes desacoplados para melhor testabilidade

Observer Pattern (Planejado) – Notificações assíncronas via eventos

📦 Instalação
1️⃣ Pré-requisitos
Node.js 18.x ou superior

PostgreSQL em execução

NPM ou Yarn

2️⃣ Clonar repositório
bash
Copiar
Editar
git clone https://seu-repositorio-aqui/bd_e_pp-backend.git
cd bd_e_pp-backend
3️⃣ Instalar dependências
bash
Copiar
Editar
npm install
4️⃣ Configurar variáveis de ambiente
bash
Copiar
Editar
# Windows
copy .env.example .env

# Linux/macOS
cp .env.example .env
Edite .env:

env
Copiar
Editar
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_banco?schema=public"
PORT=3333
5️⃣ Criar tabelas com Prisma
bash
Copiar
Editar
npx prisma migrate dev --name init
6️⃣ Iniciar servidor de desenvolvimento
bash
Copiar
Editar
npm run dev
Servidor disponível em: http://localhost:3333

📡 Uso da API
Criar um usuário
POST /api/v1/users

json
Copiar
Editar
{
  "name": "Estudante Dedicado",
  "email": "estudante@email.com",
  "password": "senhaSegura123"
}
Resposta de sucesso (201):

json
Copiar
Editar
{
  "id": 1,
  "name": "Estudante Dedicado",
  "email": "estudante@email.com",
  "createdAt": "2025-08-12T15:00:00.000Z"
}
📂 Estrutura de Pastas
pgsql
Copiar
Editar
.
├── prisma/
│   └── schema.prisma
├── src/
│   ├── modules/
│   │   └── users/
│   │       ├── user.controller.ts
│   │       ├── user.dtos.ts
│   │       ├── user.repository.ts
│   │       ├── user.routes.ts
│   │       └── user.service.ts
│   ├── shared/
│   │   ├── container/
│   │   ├── database/
│   │   └── http/
├── .env
├── package.json
└── tsconfig.json