const express = require('express');
const VendaModel = require('../models/VendasModels'); 

const router = express.Router();

// Rota para obter todas as vendas
router.get('/api/vendas', (req, res) => {
  VendaModel.getAllVendas((vendas) => {
    res.json(vendas);
  });
});

// Rota para obter detalhes de uma venda específica
router.get('/api/vendas/:id', (req, res) => {
  const idVenda = req.params.id;
  VendaModel.getVendaById(idVenda, (venda) => {
    res.json(venda);
  });
});

// Rota para registrar uma nova venda
router.post('/api/vendas', (req, res) => {
  const novaVenda = req.body;
  VendaModel.createVenda(novaVenda, (idVenda) => {
    res.json({ message: 'Venda registrada com sucesso!', id: idVenda });
  });
});

// Rota para atualizar informações de uma venda
router.put('/api/vendas/:id', (req, res) => {
  const idVenda = req.params.id;
  const dadosAtualizados = req.body;
  VendaModel.updateVenda(idVenda, dadosAtualizados, () => {
    res.json({ message: 'Informações da venda atualizadas com sucesso!' });
  });
});

// Rota para excluir uma venda
router.delete('/api/vendas/:id', (req, res) => {
  const idVenda = req.params.id;
  VendaModel.deleteVenda(idVenda, () => {
    res.json({ message: 'Venda excluída com sucesso!' });
  });
});

module.exports = router;
