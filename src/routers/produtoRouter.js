const express = require('express');
const ProdutoModel = require('../models/produtoModels'); 

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

// Rota para excluir um produto
router.delete('/api/produto/:id', (req, res) => {
  const idProduto = req.params.id;
  ProdutoModel.deleteProduto(idProduto, () => {
    res.json({ message: 'Produto excluído com sucesso!' });
  });
});

module.exports = router;
