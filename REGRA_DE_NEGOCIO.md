Versão: 1.0 (MVP)
Objetivo: Definir as regras de negócio que deverão ser respeitadas durante o desenvolvimento do sistema. Este documento serve como referência para a implementação das funcionalidades, validações e estrutura do banco de dados.

# 1. Empresa (Company)
1.1 Cadastro
Toda empresa possui um identificador único (id).
O nome da empresa é obrigatório.
O documento (CPF/CNPJ) é opcional, porém deve ser único caso informado.
O e-mail é opcional, porém deve ser único caso informado.
A empresa pode ser ativada ou desativada sem ser removida do sistema.
1.2 Relacionamentos

Uma empresa pode possuir:

vários usuários;
vários armazéns;
várias categorias;
várias marcas;
várias unidades de medida;
vários fornecedores;
vários produtos.

Todos os dados pertencem exclusivamente à empresa proprietária.

# 2. Usuários
Cada usuário pertence a apenas uma empresa.
Uma empresa pode possuir vários usuários.
A autenticação será realizada pelo Better Auth.
O sistema utilizará as tabelas geradas pelo Better Auth para autenticação e gerenciamento de sessões.
# 3. Armazém (Warehouse)
Cadastro

Cada armazém:

pertence obrigatoriamente a uma empresa;
possui um nome obrigatório;
pode possuir um código interno;
pode ser ativado ou desativado;
pode ser definido como armazém padrão.
Regras
O nome do armazém deve ser único dentro da empresa.
O código do armazém deve ser único dentro da empresa.
Empresas diferentes podem utilizar os mesmos nomes e códigos.
Um armazém não pode existir sem estar vinculado a uma empresa.
# 4. Categoria

Cada categoria:

pertence a uma empresa;
possui nome obrigatório;
pode possuir descrição;
pode ser ativada ou desativada.
Regras
O nome deve ser único dentro da empresa.
Categorias não possuem hierarquia no MVP.
# 5. Marca

Cada marca:

pertence a uma empresa;
possui nome obrigatório;
pode possuir descrição;
pode ser ativada ou desativada.
Regras
O nome deve ser único dentro da empresa.
# 6. Unidade de Medida (Unit)

Cada unidade:

pertence a uma empresa;
possui nome;
possui abreviação;
pode ser ativada ou desativada.

Exemplos:

Nome	Abreviação
Unidade	UN
Quilograma	KG
Litro	L
Caixa	CX
Regras
O nome deve ser único dentro da empresa.
A abreviação deve ser única dentro da empresa.
# 7. Fornecedor

Cada fornecedor:

pertence a uma empresa;
possui nome obrigatório;
pode possuir telefone;
pode possuir e-mail;
pode possuir documento;
pode ser ativado ou desativado.
Regras
Um fornecedor pode fornecer vários produtos.
O vínculo do fornecedor com um produto é opcional no MVP.
# 8. Produto

O produto representa apenas o cadastro do item.

O produto não armazena quantidade em estoque.

Cada produto possui
nome;
SKU;
código de barras (opcional);
descrição (opcional);
preço de venda;
estoque mínimo;
categoria;
marca (opcional);
unidade;
fornecedor principal (opcional);
empresa.
Regras
Todo produto pertence a uma empresa.
Todo produto pertence a uma categoria.
Todo produto possui uma unidade de medida.
Um produto pode possuir uma marca.
Um produto pode possuir um fornecedor principal.
O SKU deve ser único dentro da empresa.
O código de barras deve ser único dentro da empresa (quando informado).
# 9. Movimentação de Estoque (InventoryMovement)

Toda alteração no estoque deve gerar uma movimentação.

Não existe alteração direta do estoque.

Tipos de movimentação
Entrada
Saída
Transferência (Saída)
Transferência (Entrada)
Ajuste de Inventário
Cada movimentação registra
produto;
armazém;
empresa;
tipo da movimentação;
quantidade;
custo unitário (quando aplicável);
preço de venda (quando aplicável);
fornecedor (opcional);
usuário responsável;
data e hora;
observações (opcional).
Regras

Toda movimentação:

pertence a uma empresa;
pertence a um produto;
pertence a um armazém;
deve atualizar o saldo do estoque.

Nenhuma movimentação poderá ser editada após sua confirmação.

Caso exista erro, deverá ser criada uma nova movimentação corretiva.

# 10. Entrada de Estoque

A entrada representa o recebimento de produtos.

Fluxo

Selecionar armazém → Selecionar produto → Selecionar fornecedor (opcional) → Informar quantidade → Informar custo unitário → Salvar

Regras

Toda entrada:

cria uma InventoryMovement;
atualiza o saldo do estoque;
registra o custo daquela compra.
# 11. Saída de Estoque

A saída representa qualquer retirada do estoque.

Pode ser utilizada para:

venda;
perda;
quebra;
consumo interno;
doação;
vencimento;
outros motivos.
Fluxo

Selecionar armazém → Selecionar produto → Informar quantidade → Identificar se é venda → Informar preço (quando aplicável) → Salvar

Regras

Toda saída:

cria uma InventoryMovement;
reduz o saldo do estoque.
# 12. Transferência entre Armazéns

A transferência representa a movimentação de produtos entre dois armazéns da mesma empresa.

Fluxo

Selecionar produto → Informar quantidade → Selecionar armazém de origem → Selecionar armazém de destino

Regras

Uma transferência gera obrigatoriamente duas movimentações:

Saída do armazém de origem.
Entrada no armazém de destino.

Após as movimentações:

o estoque do armazém de origem é atualizado;
o estoque do armazém de destino é atualizado.

Todo o processo deve ocorrer dentro da mesma transação do banco de dados.

# 13. Inventário

O inventário representa a conferência física do estoque.

Fluxo

Selecionar armazém → Contagem física → Comparação com saldo do sistema

Regras

Caso não exista diferença:

apenas um relatório será gerado.

Caso exista diferença:

o sistema deverá informar as divergências;
deverá ser criada uma movimentação do tipo Ajuste de Inventário;
o saldo será atualizado.

O inventário nunca altera o estoque diretamente.

Toda alteração ocorre através de uma movimentação.

# 14. Consulta de Estoque

A consulta permite visualizar o saldo atual dos produtos.

Fluxo

Selecionar armazém → Selecionar produto (opcional)

O sistema deverá apresentar
saldo atual;
última movimentação;
alerta de estoque mínimo (quando aplicável).
Regras

A consulta:

nunca altera o banco de dados;
apenas consulta as informações existentes.

# 15. Saldo de Estoque (Stock)

A tabela Stock representa o saldo atual de cada produto em cada armazém.

Ela existe para evitar que o sistema precise recalcular todas as movimentações sempre que um usuário consultar o estoque.

Regras
Existe apenas um registro de saldo para cada combinação de Produto + Armazém.
O saldo nunca é editado manualmente.
Toda atualização do saldo ocorre automaticamente após uma movimentação de estoque.
O saldo deve refletir exatamente a soma das movimentações realizadas.

# 16. Regras Gerais do Sistema
Todos os registros pertencem a uma empresa.
Nenhuma operação pode acessar dados de outra empresa.
Exclusões físicas devem ser evitadas sempre que possível.
Sempre que aplicável, registros deverão ser desativados (isActive) em vez de excluídos.
Todos os cadastros possuem data de criação e atualização.
Toda movimentação deve ser rastreável.
Todo saldo de estoque deve possuir um histórico que justifique seu valor atual.
O banco de dados deve priorizar integridade, rastreabilidade e consistência das informações.
Objetivo do MVP

O objetivo desta primeira versão é fornecer um sistema capaz de:

Gerenciar múltiplas empresas.
Gerenciar múltiplos armazéns por empresa.
Cadastrar produtos e entidades auxiliares.
Registrar entradas, saídas, transferências e ajustes de estoque.
Manter o saldo atualizado em tempo real.
Disponibilizar consultas rápidas e confiáveis do estoque.
Preservar todo o histórico de movimentações para auditoria e evolução futura do sistema.