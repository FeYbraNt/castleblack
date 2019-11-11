const { Router } = require("express");
const api = Router();

// Data moved to dummy database file
const db = require("./data/db")

// EXAMPLE ENDPOINT: LIST ALL OBJECTS
api.get("/objects", (req, res) => {
  res.json(db.objects);
});

// 0. Welcome message
api.get("/", (req, res) => {
  res.status(200).send('Welcome to Castle Black API')
})

// 1. List all players
api.get("/players", (req, res) => {
  res.json(db.players)
})

// 2. Create player: adds a new player to data source.
api.post('/player', (req, res) => {
  if (!req.body.name) {
    res.status(502).send('Name is required')
  } else {
    const player = { id: db.players.length + 1, name: req.body.name }
    res.status(200).send('Player ' + player.name + ' added to data source.')
  }
})

// 3. Get player by id: returns the player to data source
api.get('/player/:id', (req, res) => {
  const id = req.params.id

  if (isFinite(id) && id > 0 ) {
      const found = db.players.find((player) => (player.id == id))
      if (found) { res.json(found) }
      else {
        res.status(404).send('Player not found.')
      }
  } else {
    res.status(400).send('Parameter "id" is not a valid number.')
  }
  
})

// 4. Arm a player with an object in its bag
api.patch('/player/:bag', (req, res) => {

})


module.exports = api;
