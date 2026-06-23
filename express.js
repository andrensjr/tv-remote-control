const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Rota para /client, que também serve o mesmo arquivo index.html.
// Isso permite que ambas as rotas funcionem como pontos de entrada para sua aplicação.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Define o diretório 'admin' como um local para servir arquivos estáticos.
// Isso permitirá que arquivos como app.css sejam acessados via /admin/app.css.
app.use('/', express.static(path.join(__dirname, 'client')));

// Define o diretório 'admin' como um local para servir arquivos estáticos.
// Isso permitirá que arquivos como app.css sejam acessados via /admin/app.css.
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// Rota para /admin, que serve o arquivo principal da aplicação.
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});