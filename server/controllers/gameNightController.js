const db = require('../models/gameNightModels');

const gameNightController = {};

gameNightController.addProfile = async (req, res, next) => {
  const { name } = req.body;
  console.log(name);
  const text = 'INSERT INTO profiles (name) VALUES ($1) RETURNING *';
  const values = [name]
  try {
    const resultObj = await db.query(text, values);
    res.locals.newProfile = resultObj.rows[0];
    console.log(res.locals.newProfile);
  } catch (err) {
    next({
      log: `gameNightController.addProfile: ERROR: ${err}`,
      message: { err: 'gameNightController.addProfile: ERROR: Check server logs for details' },
    });
  }
  next();
}

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