const express = require('express');
const EstoqueModel = require('../models/estoqueModels'); 

const router = express.Router();

// Rota para obter informações do estoque
router.get('/api/estoque', (req, res) => {
  EstoqueModel.getAllItensEstoque((itensEstoque) => {
    res.json(itensEstoque);
  });
});

// Rota para atualizar quantidade em estoque de um produto
router.put('/api/estoque/:id_produto', (req, res) => {
  const idProduto = req.params.id_produto;
  const novaQuantidade = req.body.quantidade_em_estoque;

  EstoqueModel.updateEstoqueItem(idProduto, { quantidade_em_estoque: novaQuantidade }, () => {
    res.json({ message: 'Quantidade em estoque atualizada com sucesso!' });
  });
});

module.exports = router;
