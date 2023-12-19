# API para E-comerce

## Resumo

Criei um novo sistema de gerenciamento de estoque e pedidos. O sistema é capaz de realizar o cadastro de produtos e o registro de vendas de forma eficiente.
Através do desenvolvimento de APIs e integração de sistemas, criei uma solução
simples e eficiente para o gerenciamento da loja. 

## Alguns passos da modelagem

- Identifiquei os objetos e informações que seriam gerenciados pelo sistema. No caso
do sistema de gerenciamento de vendas online as especificações indicavam que eu teria
que criar as entidades: produtos, clientes, vendas, pedidos e estoque .

- Estabeleci os atributos de cada entidade. Os atributos são as informações específicas
que descrevem cada entidade. Por exemplo, a entidade "produto" pode ter
atributos como nome, descrição, preço, por exemplo.

- Estabeleci as relações entre as entidades. As relações descrevem como as
entidades estão conectadas entre si. Por exemplo, a entidade "venda" pode estar
relacionada com a entidade "produto" através de uma relação de muitos para
muitos, indicando que uma venda pode envolver vários produtos e um produto
pode ser vendido em várias vendas.

#### Exemplo da Modelagem

#### Entidade: Produto
Atributos:
- id_produto (chave primária)
- nome
- descricao
- preco
- quantidade_em_estoque

#### Entidade: Cliente
Atributos:
- id_cliente (chave primária)
- nome
- email
- endereco

#### Entidade: Venda
Atributos:
- id_venda (chave primária)
- data_venda
- id_cliente (chave estrangeira referenciando a entidade Cliente)

#### Entidade: Pedido
Atributos:
- id_pedido (chave primária)
- id_venda (chave estrangeira referenciando a entidade Venda)
- id_produto (chave estrangeira referenciando a entidade Produto)
- quantidade
- preco_unitario

#### Entidade: Estoque
Atributos:
- id_produto (chave estrangeira referenciando a entidade Produto)
- quantidade_em_estoque

##### Relacionamentos:
- Um Cliente pode realizar várias Vendas (relação um para muitos).
- Uma Venda pode conter vários Pedidos (relação um para muitos).
- Um Produto pode estar presente em vários Pedidos (relação muitos para muitos).
- Um Produto está associado a uma única entrada no Estoque (relação um para um).

## Tecnologias usadas

Nesse projeto foi usado apenas techs back-end

#### Para modelagem de dados 

- BrModelo

#### Para desenvolvimento da API

- Node.js
- Express.js
- MySQL
- JavaScript
  
#### Para teste de Rotas

- Innsomnia

## Algumas linhas de codigo

#### Exemplo de Model existente na API

```
class ClienteModel {
  static getAllClientes(callback) {
    const sql = 'SELECT * FROM clientes';
    db.query(sql, (err, result) => {
      if (err) throw err;
      callback(result);
    });
  }

  static getClienteById(idCliente, callback) {
    const sql = 'SELECT * FROM clientes WHERE id_cliente = ?';
    db.query(sql, [idCliente], (err, result) => {
      if (err) throw err;
      callback(result[0]);
    });
  }

  static createCliente(clienteData, callback) {
    const { nome, email, endereco } = clienteData;
    const sql = 'INSERT INTO clientes (nome, email, endereco) VALUES (?, ?, ?)';
    db.query(sql, [nome, email, endereco], (err, result) => {
      if (err) throw err;
      callback(result.insertId);
    });
  }
```

#### Exemplo de uma Router existente na API

```
const router = express.Router();

// Rota para obter todos os produtos
router.get('/api/produto', (req, res) => {
  ProdutoModel.getAllProdutos((produtos) => {
    res.json(produtos);
  });
});

// Rota para obter detalhes de um produto específico
router.get('/api/produto/:id', (req, res) => {
  const idProduto = req.params.id;
  ProdutoModel.getProdutoById(idProduto, (produto) => {
    res.json(produto);
  });
});

// Rota para cadastrar um novo produto
router.post('/api/produto', (req, res) => {
  const novoProduto = req.body;
  ProdutoModel.createProduto(novoProduto, (idProduto) => {
    res.json({ message: 'Produto cadastrado com sucesso!', id: idProduto });
  });
});

// Rota para atualizar informações de um produto
router.put('/api/produto/:id', (req, res) => {
  const idProduto = req.params.id;
  const dadosAtualizados = req.body;
  ProdutoModel.updateProduto(idProduto, dadosAtualizados, () => {
    res.json({ message: 'Informações do produto atualizadas com sucesso!' });
  });
});
```

  




