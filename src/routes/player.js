const { Router } = require("express")
const playerRouter = Router()

// Data moved to dummy database file
const db = require("./../data/db")

// 2. Create player: adds a new player to data source.
playerRouter.post('/', (req, res) => {
    if (!req.body.name) {
        res.status(502).send('Player name is required')
    } else {
        const player = {
            id: db.players.length + 1,
            name: req.body.name
        }
        res.status(200).send('Player ' + player.name + ' added to data source.')
    }
})

// 3. Get player by id: returns the player to data source
playerRouter.get('/:id', (req, res) => {
    const id = req.params.id

    if (isFinite(id) && id > 0) {
        const found = db.players.find((player) => (player.id == id))
        if (found) {
            res.json(found)
        } else {
            res.status(404).send('Player not found.')
        }
    } else {
        res.status(400).send('Parameter "id" is not a valid number.')
    }

})

// 4. Arm a player with an object in its bag
playerRouter.patch('/:bag', (req, res) => {
    const bag = req.params.bag
    if (!req.body.name) {
        res.status(502).send('Player name is required')
    }
    const objFound = db.objects.find((obj) => (obj.id == bag))
    if (objFound) {
        db.players.map((player) => {
            if (player.name === req.body.name) {
                player.bag.push(objFound.id)
                res.status(200).send('Player ' + player.name + ' is now armed with ' + objFound.name)
            }
        })
    } else {
        res.status(502).send('Object ' + bag + ' not found.')
    }
})

// 5. Kill a player: sets player health to 0
playerRouter.post('/kill/:id', (req, res) => {
    const id = req.params.id
    if (isFinite(id) && id > 0) {
        const found = db.players.find((player) => player.id == id)
        if (found) {
            db.players.map((player) => {
                if (player.id == id) {
                    player.health = 0
                    res.status(200).send('Player ' + player.name + ' has been killed!')
                }
            })
        } else {
            res.status(404).send('Player with id ' + id + ' not found')
        }
    } else {
        res.status(400).send('Parameter "id" is not a valid number.')
    }
})

module.exports = playerRouter