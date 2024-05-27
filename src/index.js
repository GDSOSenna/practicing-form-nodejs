//Importa o express e o cors
const express = require('express')
const cors = require('cors')

//usando variável app como função do express
const app = express()

//criando a variável do servidor
const server = 3000

//usando express para leitura de json
app.use(express.json())
app.use(cors())

//Importa rotas!!!!

app.use(require('./routes/listRoute'))

//usando função listen do express para iniciar o servidor na porta selecionada
app.listen(server, () => console.log(`Servidor iniciado em ${server}`))