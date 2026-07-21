# PROJECT_CONTEXT.md

# SaaS de Gestão de Estoque - Contexto do Projeto

## Objetivo

Desenvolver um SaaS moderno de Gestão de Estoque, focado em pequenas e médias empresas, priorizando facilidade de uso, rapidez para realizar balanços de estoque e uma arquitetura escalável.

O objetivo é construir um produto profissional, seguindo boas práticas desde o início, sem criar dívidas técnicas.

---

# Filosofia do Projeto

Este projeto será desenvolvido pensando em:

- Escalabilidade
- Código limpo
- Arquitetura modular
- Multiempresa (Multi-Tenant)
- Segurança
- Facilidade de manutenção
- Boa experiência do usuário
- Aprendizado durante o desenvolvimento (o projeto também serve como estudo)

Todo o desenvolvimento será explicado passo a passo, entendendo o funcionamento das tecnologias utilizadas, e não apenas executando comandos.

---

# Stack Tecnológica

## Frontend

- Next.js 15
- React 19
- TypeScript

## UI

- Tailwind CSS v4
- shadcn/ui
- Radix UI (através do shadcn)
- Lucide React
- Sonner

## Backend

- Next.js Route Handlers

## Banco de Dados

- PostgreSQL

## ORM

- Prisma

## Desenvolvimento

- Docker
- Docker Compose

---

# Tecnologias Futuras (não implementar agora)

- Better Auth
- TanStack Query
- TanStack Table
- React Hook Form
- Zod
- Zustand
- Recharts
- date-fns
- Redis
- BullMQ
- MinIO
- S3
- WebSocket

---

# Gerenciador de Pacotes

Escolhido:

pnpm

Motivos:

- Mais rápido
- Economia de espaço em disco
- Cache global
- Melhor gerenciamento de dependências
- Muito utilizado em projetos modernos

---

# Ambiente Configurado

## Já instalado

- Node.js
- Git
- VSCode
- Next.js
- Tailwind
- shadcn/ui
- Docker Desktop
- Docker Compose
- PostgreSQL (container Docker)
- Prisma

---

# Docker

Foi decidido utilizar Docker desde o início.

Motivos:

- Ambiente reproduzível
- Fácil instalação
- Banco isolado
- Facilita deploy
- Evita instalação manual do PostgreSQL

Estrutura atual:

```
Windows
│
├── VSCode
├── Docker Desktop
│
└── Container PostgreSQL
```

---

## docker-compose.yml

Utilizado:

```yaml
services:
  postgres:
    image: postgres:17

    container_name: estoque-postgres

    restart: unless-stopped

    environment:
      POSTGRES_USER: estoque_user
      POSTGRES_PASSWORD: estoque_password
      POSTGRES_DB: estoque_db

    ports:
      - "5432:5432"

    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

## DATABASE_URL

```
DATABASE_URL="postgresql://estoque_user:estoque_password@localhost:5432/estoque_db?schema=public"
```

---

# Prisma

Foi inicializado.

Objetivo:

Utilizar Prisma como ORM principal.

Fluxo adotado:

```
schema.prisma

↓

Migration

↓

PostgreSQL

↓

Prisma Client

↓

Next.js
```

Nunca criar tabelas manualmente.

Toda alteração deverá ocorrer através de migrations.

---

# Convenções do Projeto

## Código

Todo o código será escrito em inglês.

Exemplos:

```
Product

Category

Supplier

Warehouse

InventoryMovement
```

---

## Interface

Toda a interface será em português.

Exemplos:

```
Produtos

Categorias

Fornecedores

Movimentações

Estoque
```

---

## Models

Sempre no singular.

Exemplo:

```
Product

Company

Category

Supplier
```

Nunca:

```
Products

Companies
```

---

## Campos

Sempre camelCase.

Exemplo:

```
createdAt

updatedAt

minimumStock

companyId
```

---

## IDs

Foi decidido utilizar:

```
String

@default(cuid())
```

Ao invés de:

```
Int

autoincrement()
```

Motivos:

- URLs mais seguras
- Melhor para SaaS
- Não expõe quantidade de registros
- Facilita futuras integrações

---

## Campos padrão

Toda tabela deverá possuir:

```
id

createdAt

updatedAt
```

Soft delete será avaliado conforme necessidade.

Não adicionar `deletedAt` em todas as tabelas automaticamente.

---

# Arquitetura Geral

Inicialmente o sistema será Multiempresa.

Tudo pertence a uma Company.

```
Company
│
├── Users
├── Warehouses
├── Categories
├── Brands
├── Suppliers
├── Products
├── InventoryMovements
└── ...
```

---

# Ordem de Desenvolvimento

Foi definido que primeiro será feita a modelagem completa do banco de dados.

Somente depois os models serão implementados no Prisma.

Fluxo:

```
Modelagem

↓

Revisão

↓

Prisma

↓

Migration

↓

CRUD

↓

Frontend
```

---

# Ferramenta escolhida para modelagem

Escolhido:

DrawDB

Motivos:

- Gratuito
- Interface intuitiva
- Modelagem visual
- Excelente para revisar relacionamentos
- Facilita planejamento

Alternativas avaliadas:

- dbdiagram.io
- Prisma Editor
- DrawSQL
- Eraser

---

# Entidades previstas para o MVP

Ainda serão refinadas durante a modelagem.

Lista inicial:

- Company
- User
- Warehouse
- Category
- Brand
- Unit
- Supplier
- Product
- InventoryMovement
- StockBalance
- StockBalanceItem

---

# Filosofia da Modelagem

Antes de implementar qualquer tabela:

- Entender sua responsabilidade.
- Definir relacionamentos.
- Evitar retrabalho.
- Pensar em escalabilidade.
- Pensar em futuras funcionalidades.

A modelagem será feita primeiro no DrawDB.

Somente depois será convertida para Prisma.

---

# Metodologia de Desenvolvimento

O projeto será desenvolvido como se fosse um produto comercial real.

Não serão utilizados atalhos.

Cada tecnologia será aprendida corretamente.

Cada decisão arquitetural deverá possuir justificativa técnica.

O objetivo não é apenas terminar o sistema.

O objetivo é aprender arquitetura profissional de software durante sua construção.