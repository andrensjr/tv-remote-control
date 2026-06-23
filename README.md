# tvs-remote-control

Este projeto é uma aplicação de controle remoto para TVs, construída com Node.js e Express. Ele utiliza WebSockets para comunicação em tempo real, permitindo que uma interface web funcione como um controle remoto.

## 🚀 Tecnologias Utilizadas

- **Socket.IO**: Biblioteca para comunicação bidirecional em tempo real baseada em eventos.
- **Express.js**: Framework para criar o servidor web e gerenciar as rotas.
- **Node.js**: Ambiente de execução do servidor.


## 📂 Estrutura do Projeto

- `server.js`: Arquivo principal que configura e inicia o servidor Express.
- `/admin`: Rota e diretório para a interface de administração.
- `/client`: Rota para a interface do cliente.

## 🏁 Como Começar

1.  **Instale as dependências:**
    ```bash
    yarn install
    ```

2.  **Inicie o servidor Websocket:**
    O servidor websocket pode ser iniciado executando o seguinte comando:
    ```bash
    npm start-server
    ```
    Após iniciar, o servidor estará disponível em `http://localhost:3001`.


3.  **Inicie o servidor do Express (admin e client):**
    O servidor pode ser iniciado executando o seguinte comando:
    ```bash
    npm start
    ```
    Após iniciar, o servidor estará disponível em `http://localhost:3000`.

4.  **Abra o admin e o client :**
    client: http://localhost:3000/
    admin: http://localhost:3000/admin/
