const express = require('express');
const router = express.Router();
const gameNightController = require('../controllers/gameNightController');

router.post('/profile',
  gameNightController.addProfile,
  (req,res) => res.status(200).json(res.locals.newProfile)
)

router.post('/game',
  gameNightController.addGame,
  (req,res) => res.status(200).json(res.locals.newGame)
)


module.exports = router