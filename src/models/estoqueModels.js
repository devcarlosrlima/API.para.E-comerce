const db = require('../../config/db'); 

class EstoqueModel {
  static getAllItensEstoque(callback) {
    const sql = 'SELECT * FROM estoque';
    db.query(sql, (err, result) => {
      if (err) throw err;
      callback(result);
    });
  }

  static getEstoqueItemById(idItemEstoque, callback) {
    const sql = 'SELECT * FROM estoque WHERE id_item_estoque = ?';
    db.query(sql, [idItemEstoque], (err, result) => {
      if (err) throw err;
      callback(result[0]);
    });
  }

  static createEstoqueItem(itemEstoqueData, callback) {
    const { id_produto, quantidade_em_estoque } = itemEstoqueData;
    const sql = 'INSERT INTO estoque (id_produto, quantidade_em_estoque) VALUES (?, ?)';
    db.query(sql, [id_produto, quantidade_em_estoque], (err, result) => {
      if (err) throw err;
      callback(result.insertId);
    });
  }

  static updateEstoqueItem(idItemEstoque, itemEstoqueData, callback) {
    const { id_produto, quantidade_em_estoque } = itemEstoqueData;
    const sql = 'UPDATE estoque SET id_produto = ?, quantidade_em_estoque = ? WHERE id_item_estoque = ?';
    db.query(sql, [id_produto, quantidade_em_estoque, idItemEstoque], (err, result) => {
      if (err) throw err;
      callback();
    });
  }

  static deleteEstoqueItem(idItemEstoque, callback) {
    const sql = 'DELETE FROM estoque WHERE id_item_estoque = ?';
    db.query(sql, [idItemEstoque], (err, result) => {
      if (err) throw err;
      callback();
    });
  }
}

module.exports = EstoqueModel;
