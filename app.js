const express = require('express')
const app = express()
const morgan = require('morgan')
const catRoutes = require('./routes/catsRouter')
const cors = require('cors')

// a logger to help with debugging - used as middleware
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use('/cats', catRoutes)

app.get('/', (req, res) => {
    res.send("Hello world")
})

module.exports = app
