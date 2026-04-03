# 🍽️ API Restaurant

<p align="left">
  <img src="https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-20%2B-339933?style=flat&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-5.x-000000?style=flat&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/SQLite-3-003B57?style=flat&logo=sqlite&logoColor=white" />
  <img src="https://img.shields.io/badge/Licença-ISC-yellow?style=flat" />
</p>

API REST para gerenciamento de pedidos das mesas de um restaurante, desenvolvida durante os estudos com a **Rocketseat**.

---

## 📌 Sobre o Projeto

A aplicação permite gerenciar os pedidos feitos nas mesas de um restaurante, oferecendo operações de criação, leitura, atualização e remoção de dados por meio de uma API RESTful.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Versão | Função |
|---|---|---|
| Node.js | 20+ | Ambiente de execução |
| TypeScript | 5.5.4 | Tipagem estática |
| Express | 5.x | Framework HTTP |
| Knex.js | 3.1.0 | Query builder |
| SQLite3 | 6.x | Banco de dados local |
| Zod | 3.23.8 | Validação de dados |
| tsx | 4.x | Execução de TS em dev |

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) v20 ou superior
- [npm](https://www.npmjs.com/) (já incluso com o Node.js)
- [Git](https://git-scm.com/)

---

## ▶️ Como Executar

```bash
# 1. Clone o repositório
git clone https://github.com/KauaGabriell/api-restaurant.git
cd api-restaurant

# 2. Instale as dependências
npm install

# 3. Execute as migrations do banco de dados
npm run knex -- migrate:latest

# 4. (Opcional) Popule o banco com dados iniciais
npm run knex -- seed:run

# 5. Inicie o servidor em modo de desenvolvimento
npm run dev
```

A API estará disponível em `http://localhost:3333`.

---

## 📜 Scripts Disponíveis

| Script | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor com hot reload |
| `npm run knex -- migrate:latest` | Executa todas as migrations pendentes |
| `npm run knex -- migrate:rollback` | Desfaz a última migration |
| `npm run knex -- seed:run` | Popula o banco de dados com seeds |

---

## 🔗 Endpoints da API

Base URL: `http://localhost:3333`

### 🛒 Products

| Método | Rota | Descrição | Body |
|---|---|---|---|
| `GET` | `/products` | Lista todos os produtos | — |
| `POST` | `/products` | Cria um novo produto | `{ "name", "price" }` |
| `PUT` | `/products/:id` | Atualiza um produto | `{ "name", "price" }` |
| `DELETE` | `/products/:id` | Remove um produto | — |

### 🪑 Tables

| Método | Rota | Descrição | Body |
|---|---|---|---|
| `GET` | `/tables` | Lista todas as mesas | — |

### 📋 Tables Sessions

| Método | Rota | Descrição | Body |
|---|---|---|---|
| `GET` | `/tables-sessions` | Lista todas as sessões | — |
| `POST` | `/tables-sessions` | Abre uma sessão na mesa | `{ "table_id" }` |
| `PATCH` | `/tables-sessions/:id` | Fecha a sessão da mesa | — |

### 📦 Orders

| Método | Rota | Descrição | Body |
|---|---|---|---|
| `GET` | `/orders/table-sessions/:id` | Lista pedidos de uma sessão | — |
| `POST` | `/orders` | Cria um pedido | `{ "table_session_id", "product_id", "quantity" }` |
| `GET` | `/orders/table-sessions/:id/total` | Retorna o total da sessão | — |

---

## 📁 Estrutura de Pastas

```
api-restaurant/
├── src/
│   ├── database/
│   │   ├── migrations/     # Migrations do banco de dados
│   │   ├── seeds/          # Seeds para popular o banco
│   │   └── database.db     # Arquivo do banco SQLite (gerado localmente)
│   └── server.ts           # Ponto de entrada da aplicação
├── knexfile.ts             # Configuração do Knex (client, paths, pool)
├── tsconfig.json           # Configuração do TypeScript
├── .gitignore
└── package.json
```

---

## 📝 Licença

Este projeto está sob a licença **ISC**. Consulte o arquivo `package.json` para mais detalhes.

---

> Projeto desenvolvido para fins de estudo em conjunto com a [Rocketseat](https://rocketseat.com.br). 🚀
