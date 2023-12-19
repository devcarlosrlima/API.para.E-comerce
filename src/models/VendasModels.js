const db = require('../../config/db'); 

class VendaModel {
  static getAllVendas(callback) {
    const sql = 'SELECT * FROM vendas';
    db.query(sql, (err, result) => {
      if (err) throw err;
      callback(result);
    });
  }

  static getVendaById(idVenda, callback) {
    const sql = 'SELECT * FROM vendas WHERE id_venda = ?';
    db.query(sql, [idVenda], (err, result) => {
      if (err) throw err;
      callback(result[0]);
    });
  }

  static createVenda(vendaData, callback) {
    const { data_venda, id_cliente, pedidos } = vendaData;

    db.beginTransaction((err) => {
      if (err) throw err;

      const sqlVenda = 'INSERT INTO vendas (data_venda, id_cliente) VALUES (?, ?)';
      db.query(sqlVenda, [data_venda, id_cliente], (err, result) => {
        if (err) {
          db.rollback(() => {
            throw err;
          });
        }

        const vendaId = result.insertId;

        const sqlPedido = 'INSERT INTO pedidos (id_venda, id_produto, quantidade, preco_unitario) VALUES (?, ?, ?, ?)';
        pedidos.forEach((pedido) => {
          db.query(sqlPedido, [vendaId, pedido.id_produto, pedido.quantidade, pedido.preco_unitario], (err) => {
            if (err) {
              db.rollback(() => {
                throw err;
              });
            }
          });
        });

        db.commit((err) => {
          if (err) {
            db.rollback(() => {
              throw err;
            });
        }
          callback(vendaId);
        });
      });
    });
  }

  static updateVenda(idVenda, vendaData, callback) {
    const { data_venda, id_cliente, pedidos } = vendaData;

    db.beginTransaction((err) => {
      if (err) throw err;

      const sqlVenda = 'UPDATE vendas SET data_venda = ?, id_cliente = ? WHERE id_venda = ?';
      db.query(sqlVenda, [data_venda, id_cliente, idVenda], (err) => {
        if (err) {
          db.rollback(() => {
            throw err;
          });
        }

        const sqlExcluirPedidos = 'DELETE FROM pedidos WHERE id_venda = ?';
        db.query(sqlExcluirPedidos, [idVenda], (err) => {
          if (err) {
            db.rollback(() => {
              throw err;
            });
          }

          const sqlPedido = 'INSERT INTO pedidos (id_venda, id_produto, quantidade, preco_unitario) VALUES (?, ?, ?, ?)';
          pedidos.forEach((pedido) => {
            db.query(sqlPedido, [idVenda, pedido.id_produto, pedido.quantidade, pedido.preco_unitario], (err) => {
              if (err) {
                db.rollback(() => {
                  throw err;
                });
              }
            });
          });

          db.commit((err) => {
            if (err) {
              db.rollback(() => {
                throw err;
              });
            }
            callback();
          });
        });
      });
    });
  }

  static deleteVenda(idVenda, callback) {
    db.beginTransaction((err) => {
      if (err) throw err;

      const sqlExcluirPedidos = 'DELETE FROM pedidos WHERE id_venda = ?';
      db.query(sqlExcluirPedidos, [idVenda], (err) => {
        if (err) {
          db.rollback(() => {
            throw err;
          });
        }

        const sqlExcluirVenda = 'DELETE FROM vendas WHERE id_venda = ?';
        db.query(sqlExcluirVenda, [idVenda], (err) => {
          if (err) {
            db.rollback(() => {
              throw err;
            });
          }

          db.commit((err) => {
            if (err) {
              db.rollback(() => {
                throw err;
              });
            }
            callback();
          });
        });
      });
    });
  }
}

module.exports = VendaModel;
