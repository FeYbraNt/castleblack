const { Router } = require("express")
const objRouter = Router()

// Data moved to dummy database file
const db = require("./../data/db")

// 6. Create object: add a new object to data source
objRouter.post('/', (req, res) => {
    if (!req.body.name) {
        res.status(502).send('Object name is required')
    } else if (!req.body.value) {
        res.status(502).send('Object value is required')
    } else {
        const object = {
            id: db.objects.length + 1,
            name: req.body.name,
            value: req.body.value
        }
        res.status(200).send('Object ' + object.name + ' added to data source.')
    }
})

// 7. Get object by id: returns the object for the given id
objRouter.get('/:id', (req, res) => {
    const id = req.params.id

    if (isFinite(id) && id > 0) {
        const found = db.objects.find((obj) => (obj.id == id))
        if (found) {
            res.json(found)
        } else {
            res.status(404).send('Object not found.')
        }
    } else {
        res.status(400).send('Parameter "id" is not a valid number')
    }
})

// 8. Upgrade object: increase/descrease the value of the object given by id with a new value
objRouter.patch('/:id/:value', (req, res) => {
    const id = req.params.id
    const value = req.params.value
    if (isFinite(id) && id > 0) {
        if (isFinite(value)) {
            const objFound = db.objects.find((obj) => (obj.id == id))
            if (objFound) {
                db.objects.map((obj) => {
                    if (obj.id == id) {
                        obj.value += parseInt(value)
                        res.status(200).send(obj.name + ' has increase/decrease its value to ' + obj.value)
                    }
                })
            } else {
                res.status(404).send('Object with id ' + id + ' not found')
            }
        } else { res.status(400).send('Parameter "value" not valid') }
    } else {
        res.status(400).send('Parameter "id" is not a valid number')
    }
})

// 9. Destroy object: remove an object from available objects
objRouter.delete('/:id', (req, res) => {
    const id = req.params.id
    if (isFinite(id) && id > 0) {
        const objFound = db.objects.find((obj) => (obj.id == id))
        if (objFound) { 
            db.objects.splice(objFound.id)
            res.status(200).send(objFound.name + ' has been removed')
        } else {
            res.status(404).send('Object with id ' + id + ' not found')
        }
    } else {
        res.status(400).send('Parameter "id" is not a valid number')
    }
})

module.exports = objRouter