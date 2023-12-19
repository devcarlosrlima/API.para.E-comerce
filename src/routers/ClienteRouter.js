const express = require('express');
const ClienteModel = require('../models/ClienteModels'); 

const router = express.Router();

// Rota para obter todos os clientes
router.get('/api/clientes', (req, res) => {
  ClienteModel.getAllClientes((clientes) => {
    res.json(clientes);
  });
});

// Rota para obter detalhes de um cliente específico
router.get('/api/clientes/:id', (req, res) => {
  const idCliente = req.params.id;
  ClienteModel.getClienteById(idCliente, (cliente) => {
    res.json(cliente);
  });
});

// Rota para cadastrar um novo cliente
router.post('/api/clientes', (req, res) => {
  const novoCliente = req.body;
  ClienteModel.createCliente(novoCliente, (idCliente) => {
    res.json({ message: 'Cliente cadastrado com sucesso!', id: idCliente });
  });
});

// Rota para atualizar informações de um cliente
router.put('/api/clientes/:id', (req, res) => {
  const idCliente = req.params.id;
  const dadosAtualizados = req.body;
  ClienteModel.updateCliente(idCliente, dadosAtualizados, () => {
    res.json({ message: 'Informações do cliente atualizadas com sucesso!' });
  });
});

// Rota para excluir um cliente
router.delete('/api/clientes/:id', (req, res) => {
  const idCliente = req.params.id;
  ClienteModel.deleteCliente(idCliente, () => {
    res.json({ message: 'Cliente excluído com sucesso!' });
  });
});

module.exports = router;
