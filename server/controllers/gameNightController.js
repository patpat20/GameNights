const db = require('../models/gameNightModels');

const gameNightController = {};


gameNightController.addGame = async (req, res, next) => {
  const { name, maxPlayers } = req.body;
  console.log(req.body);
  const text = 'INSERT INTO games (name,maxPlayers) VALUES ($1, $2) RETURNING *';
  const values = [name, maxPlayers]
  try {
    const resultObj = await db.query(text, values);
    res.locals.newGame = resultObj.rows[0];
    console.log(res.locals.newGame);
  } catch (err) {
    next({
      log: `gameNightController.addGame: ERROR: ${err}`,
      message: { err: 'gameNightController.addGame: ERROR: Check server logs for details' },
    });
  }
  next();
}

module.exports = gameNightController;