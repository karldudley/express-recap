const express = require('express')
const router = express.Router()

const catsController = require('../controllers/catsController')

router
    .route('/')
    .get(catsController.index)
    .post(catsController.create)

router
    .route('/:id')
    .get(catsController.show)
    .patch(catsController.update)
    .delete(catsController.destroy)

module.exports = router
