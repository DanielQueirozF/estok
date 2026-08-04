# PROJECT_CONTEXT.md

# Projeto
SaaS de Gestão de Estoque (MVP)

---

# Objetivo

Desenvolver um SaaS moderno de gestão de estoque seguindo boas práticas de arquitetura, modelagem de banco de dados e desenvolvimento Full Stack.

O foco atual é construir um MVP sólido, evitando funcionalidades desnecessárias e priorizando uma arquitetura escalável.

---

# Stack Tecnológica

## Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

## Backend

- Next.js Route Handlers
- Prisma ORM

## Banco de Dados

- PostgreSQL

## Autenticação

Planejado:

- Better Auth

Motivo:

- Open Source
- Excelente integração com Prisma
- Sem custos para o MVP
- Controle total sobre usuários

---

# Filosofia do Projeto

Durante todo o desenvolvimento seguimos uma regra:

> Se não agrega valor ao MVP, não entra agora.

Todo o banco foi modelado pensando em:

- simplicidade
- escalabilidade
- performance
- facilidade de manutenção

Sempre priorizando arquitetura limpa.

---

# Arquitetura do Sistema

## Multiempresa

Uma empresa poderá possuir:

- vários usuários
- vários armazéns
- várias categorias
- várias marcas
- várias unidades
- vários fornecedores
- vários produtos

No MVP:

- usuário pertence a apenas uma empresa.

---

# Modelagem Atual

## Company

Responsável pelos dados da empresa.

Campos principais:

- id
- name
- document
- logoUrl
- phone
- email
- isActive
- createdAt
- updatedAt

---

## Warehouse

Representa os armazéns da empresa.

Cada armazém possui:

- nome
- código
- endereço
- cidade
- estado
- CEP
- país
- ativo
- padrão

Relacionamento:

Warehouse -> Company

Regras:

- nome único por empresa
- código único por empresa

---

## Category

Cadastro simples.

Campos:

- name
- description
- isActive

Relacionamento:

Category -> Company

---

## Brand

Mesmo padrão de Category.

Relacionamento:

Brand -> Company

---

## Unit

Representa unidade de medida.

Exemplos:

- UN
- KG
- L
- CX

Campos:

- name
- abbreviation
- isActive

Relacionamento:

Unit -> Company

Regras:

- nome único
- abreviação única

---

## Supplier

Cadastro de fornecedores.

Relacionamento:

Supplier -> Company

---

## Product

Representa apenas o cadastro do produto.

Não armazena quantidade em estoque.

Campos principais:

- name
- sku
- barcode
- description
- salePrice
- minimumStock
- isActive

Relacionamentos:

- Company
- Category
- Brand
- Unit
- Supplier

Regras:

- SKU único por empresa
- código de barras único por empresa

Importante:

O custo de compra NÃO fica no Product.

Ele pertence às movimentações.

---

## InventoryMovement

Representa todo histórico de movimentações.

Todo evento que altera estoque gera uma movimentação.

Tipos planejados:

- ENTRY
- EXIT
- TRANSFER_IN
- TRANSFER_OUT
- ADJUSTMENT

Campos esperados:

- company
- warehouse
- product
- supplier (opcional)
- quantity
- purchaseCost
- salePrice
- notes
- movementDate
- createdAt

No futuro:

- user (Better Auth)

Nunca será permitido alterar movimentações já confirmadas.

Correções serão feitas através de novas movimentações.

---

## Stock

Representa apenas o saldo atual.

Não possui histórico.

Responsável pela performance do sistema.

Campos:

- company
- warehouse
- product
- quantity
- createdAt
- updatedAt

Regras:

Existe apenas um registro para:

Produto + Armazém

Toda atualização ocorre automaticamente após uma InventoryMovement.

Nunca é editado manualmente.

---

# Fluxos Modelados

Foi criado um fluxograma completo contendo:

## Cadastro

Empresa

↓

- Warehouse
- Category
- Brand
- Unit
- Supplier
- Product

---

## Entrada

Selecionar:

- armazém
- produto
- fornecedor (opcional)
- quantidade
- custo unitário

↓

InventoryMovement

↓

Atualiza Stock

---

## Saída

Selecionar:

- armazém
- produto
- quantidade
- motivo

Se for venda:

- preço de venda

↓

InventoryMovement

↓

Atualiza Stock

---

## Transferência

Selecionar:

- armazém origem
- produto
- quantidade
- armazém destino

↓

TRANSFER_OUT

↓

TRANSFER_IN

↓

Atualiza Stock

---

## Inventário

Selecionar:

- armazém

↓

Contagem física

↓

Existe diferença?

Se sim:

↓

ADJUSTMENT

↓

InventoryMovement

↓

Atualiza Stock

---

## Consulta

Selecionar:

- armazém
- produto (opcional)

Sistema apresenta:

- saldo atual
- última movimentação
- alerta de estoque mínimo

---

# Regras de Negócio

Documento criado contendo:

- regras da empresa
- regras dos armazéns
- regras dos produtos
- regras das movimentações
- regras do estoque
- regras de inventário
- regras de consulta
- regras gerais do sistema

Esse documento será utilizado como referência durante o desenvolvimento.
Disponivel em REGRA_DE_NEGOCIO.md

---

# Decisões Arquiteturais

✔ Não armazenar quantidade no Product.

✔ Stock é apenas saldo atual.

✔ InventoryMovement é o histórico completo.

✔ Toda alteração de estoque gera movimentação.

✔ O saldo nunca é alterado manualmente.

✔ O custo pertence à movimentação.

✔ O preço de venda pertence ao produto.

✔ Utilizar Decimal para quantidades.

✔ Utilizar Enum para tipos de movimentação.

✔ Todas as entidades principais pertencem a uma Company.

---

# Estado Atual

A modelagem do banco do MVP está finalizada.

Foi realizada uma revisão arquitetural completa.

---

# Próximos Passos

1. Gerar a primeira migration com Prisma.
2. Configurar Better Auth.
3. Implementar autenticação.
4. Desenvolver as APIs.
5. Construir o frontend.
6. Implementar casos de uso seguindo as Regras de Negócio e o Fluxograma.

---

# Filosofia para as próximas conversas

Sempre que uma nova funcionalidade surgir, responder primeiro:

"Essa funcionalidade é necessária para o MVP?"

Se não for, registrar como melhoria futura e manter o foco na entrega do MVP.