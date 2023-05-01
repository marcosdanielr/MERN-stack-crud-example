const { Router } = require('express')
const PersonController = require('./controllers/PersonController')

const router = Router()

router.post('/create', (req, res) => PersonController.create(req, res))

router.get('/list', (req, res) => PersonController.getAll(req, res))

router.get('/get/:id', (req, res) => PersonController.getById(req, res))

router.delete('/delete/:id', (req, res) => PersonController.delete(req, res))

router.patch('/update/:id', (req, res) => PersonController.update(req, res))

module.exports = router
