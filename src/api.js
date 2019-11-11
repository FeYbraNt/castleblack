const { Router } = require("express");
const api = Router();
const playerRouter = require("./routes/player")
const objRouter = require("./routes/object")

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

// Connect routes
api.use("/player", playerRouter)
api.use("/object", objRouter)

module.exports = api;
