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

gameNightController.addEvent = async (req, res, next) => {
  console.log(req.body);
  const { host, location, time, maxPlayers, game_id } = req.body;
  const text = 'INSERT INTO events (host, location, time, maxPlayers, game_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [host, location, time, maxPlayers, game_id]
  try {
    const resultObj = await db.query(text, values);
    res.locals.newEvent = resultObj.rows[0];

    console.log(res.locals.newEvent);
  } catch (err) {
    next({
      log: `gameNightController.addEvent: ERROR: ${err}`,
      message: { err: 'gameNightController.addEvent: ERROR: Check server logs for details' },
    });
  }
  next();
}

gameNightController.joinEvent = async (req, res, next) => {
  console.log(req.body);
  let { profile_id, event_id } = req.body;
  if (res.locals.newEvent) {
    event_id = res.locals.newEvent.event_id;
    profile_id = req.body.host;
  }
  const text = 'INSERT INTO profiles_in_event ( profile_id, event_id ) VALUES ($1, $2) RETURNING *';
  const values = [profile_id, event_id]
  try {
    const resultObj = await db.query(text, values);
  } catch (err) {
    next({
      log: `gameNightController.addEvent: ERROR: ${err}`,
      message: { err: 'gameNightController.addEvent: ERROR: Check server logs for details' },
    });
  }
  next();
}

// gameNightController.joinEvent = async (req, res, next) => {
//   console.log(req.body);
//   const { profile_id, event_id } = req.body;
//   if (res.locals.newEvent) event_id = res.locals.newEvent.rows[0].event_id;
//   const text = 'INSERT INTO profiles_in_event ( profile_id, event_id ) VALUES ($1, $2) RETURNING *';
//   const values = [profile_id, event_id]
//   try {
//     const resultObj = await db.query(text, values);
//   } catch (err) {
//     next({
//       log: `gameNightController.addEvent: ERROR: ${err}`,
//       message: { err: 'gameNightController.addEvent: ERROR: Check server logs for details' },
//     });
//   }
//   next();
// }
module.exports = gameNightController;