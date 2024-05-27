//Importar a função rotas do express
const router = require('express').Router()

//importa a lógica da lista
const listController = require('../controllers/listController')

//importa os métodos das rotas

router.get('/items', listController.getItems)
router.post('/items', listController.createItem)
router.put('/items/:id', listController.updateItem)
router.delete('/items/:id', listController.deleteItem)

//exporta a rota para uso
module.exports = router