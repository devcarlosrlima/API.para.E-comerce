const db = require('../../config/db');

class ProdutoModel {
  static getAllProdutos(callback) {
    const sql = 'SELECT * FROM produto';
    db.query(sql, (err, result) => {
      if (err) throw err;
      callback(result);
    });
  }

  static getProdutoById(idProduto, callback) {
    const sql = 'SELECT * FROM produto WHERE id_produto = ?';
    db.query(sql, [idProduto], (err, result) => {
      if (err) throw err;
      callback(result[0]);
    });
  }

  static createProduto(produtoData, callback) {
    const { nome, descricao, preco, quantidade_em_estoque } = produtoData;
    const sql = 'INSERT INTO produto (nome, descricao, preco, quantidade_em_estoque) VALUES (?, ?, ?, ?)';
    db.query(sql, [nome, descricao, preco, quantidade_em_estoque], (err, result) => {
      if (err) throw err;
      callback(result.insertId);
    });
  }

  static updateProduto(idProduto, produtoData, callback) {
    const { nome, descricao, preco, quantidade_em_estoque } = produtoData;
    const sql = 'UPDATE produto SET nome = ?, descricao = ?, preco = ?, quantidade_em_estoque = ? WHERE id_produto = ?';
    db.query(sql, [nome, descricao, preco, quantidade_em_estoque, idProduto], (err, result) => {
      if (err) throw err;
      callback();
    });
  }

  static deleteProduto(idProduto, callback) {
    const sql = 'DELETE FROM produto WHERE id_produto = ?';
    db.query(sql, [idProduto], (err, result) => {
      if (err) throw err;
      callback();
    });
  }
}

module.exports = ProdutoModel;
