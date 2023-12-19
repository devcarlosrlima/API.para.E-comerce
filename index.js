const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db')
const produtosRoutes = require('./src/routers/produtoRouter')
const clientesRoutes = require('./src/routers/ClienteRouter')
const vendasRoutes = require('./src/routers/VendasRouter')
const estoqueRoutes = require('./src/routers/EstoqueRouters')

const app = express();
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(produtosRoutes);
app.use(clientesRoutes);
app.use(vendasRoutes);
app.use(estoqueRoutes);


app.listen(8080, () => {
    console.log('servidor funcionando na porta 8080');
});