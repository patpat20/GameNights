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

router.post('/event',
  gameNightController.addEvent,
  gameNightController.joinEvent,
  (req, res) => res.status(200).json(res.locals.newEvent)
)

router.post('/join',
  gameNightController.joinEvent,
  (req, res) => res.status(200).json('successfully joined')
)



module.exports = router