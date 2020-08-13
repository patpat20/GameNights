const express = require('express');
const router = express.Router();
const gameNightController = require('../controllers/gameNightController');
// const userController = require('../controllers/userController');

// moved to login section of server
// router.post('/profile',
//   userController.addProfile,
//   (req, res) => res.status(200).json(res.locals.newProfile)
// )

router.post('/game',
  gameNightController.addGame,
  (req, res) => res.status(200).json(res.locals.newGame)
)


module.exports = router