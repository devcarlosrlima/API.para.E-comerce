const db = require('../../config/db'); 

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

  static updateCliente(idCliente, clienteData, callback) {
    const { nome, endereco } = clienteData;
    const sql = 'UPDATE clientes SET nome = ?, endereco = ? WHERE id_cliente = ?';
    db.query(sql, [nome, endereco, idCliente], (err, result) => {
      if (err) throw err;
      callback(result);
    });
  }

  static deleteCliente(idCliente, callback) {
    const sql = 'DELETE FROM clientes WHERE id_cliente = ?';
    db.query(sql, [idCliente], (err, result) => {
      if (err) throw err;
      callback();
    });
  }
}

module.exports = ClienteModel;
