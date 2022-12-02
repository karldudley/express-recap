const fs = require('fs')
const path = require('path')

const data = {
    cats: require('../models/cat.json'),
    setCats: (data) => {
        fs.writeFileSync(path.resolve("models/cat.json"), JSON.stringify(data))
    }
}

const index = (req, res) => {
    res.json(data.cats)
}

const show = (req, res) => {
    // array methods to learn: find, filer, reduce, forEach, map
    const cat = data.cats.find(c => c.id == req.params.id)
    if (!cat) {
        return res.status(404).json({"message":     `Cat with id ${req.params.id} not found`})
    }
    res.json(cat)
}
// new would show a form that calls create (form method="post" action="/")
const create = (req, res) => {
    //get the data from a form or from postman
    const newCat = {
        // asign a new id automatically
        id: data.cats?.length ? data.cats[data.cats.length - 1].id + 1 : 1,
        name: req.body.name
    }
    
    if (!newCat.name) {
        return res.status(400).json({"message": "Please add a name"})
    }

    data.setCats([...data.cats, newCat])
    res.status(201).json(newCat)
}

const update = (req, res) => {
    const cat = data.cats.find(c => c.id == req.params.id)

    if (!cat) {
        return res.status(404).json({"message":     `Cat with id ${req.params.id} not found`})
    }

    if (req.body.name) cat.name = req.body.name

    const filteredArray = data.cats.filter(c => c.id != req.params.id)
    data.setCats([...filteredArray, cat])
    res.json([...filteredArray, cat])
}

const destroy = (req, res) => {
    const cat = data.cats.find(c => c.id == req.params.id)

    if (!cat) {
        return res.status(404).json({"message":     `Cat with id ${req.params.id} not found`})
    }

    const allTheCatsExceptTheDeletedOne = data.cats.filter(c => c.id != req.params.id)
    data.setCats(allTheCatsExceptTheDeletedOne)
    res.status(200).json(...allTheCatsExceptTheDeletedOne)
}

module.exports = { index, show, create, update, destroy }
