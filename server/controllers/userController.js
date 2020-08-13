const db = require('../models/gameNightModels');

const bcrypt = require('bcryptjs')
const SWF = 10;

const userController = {};

userController.addProfile = async (req, res, next) => {
  let { name, username, password } = req.body;
  const hashedPass = await new Promise((res, rej) => {
    bcrypt.hash(password, SWF, (err, hash) => {
      if (err) rej(err);
      res(hash);
    })
  })
  const text = 'INSERT INTO profiles (name, username, password) VALUES ($1, $2, $3) RETURNING *';
  const values = [name, username, hashedPass]
  try {
    const resultObj = await db.query(text, values);
    res.locals.newProfile = resultObj.rows[0];
    console.log(res.locals.newProfile);
    res.locals.userId = resultObj.rows[0].profile_id;
  } catch (err) {
    next({
      log: `userController.addProfile: ERROR: ${err}`,
      message: { err: 'userController.addProfile: ERROR: Check server logs for details' },
    });
  }
  next();
}

userController.verifyUser = async (req, res, next) => {
  try {
    console.log('body:', req.body)
    const { username, password } = req.body;
    if (!username || !password) { return next('missing username or password in userController.verifyUser') }

    const text = `SELECT *
    FROM profiles
    WHERE username = '${username}'` // added hard coded '' b/c search was not viewed as a string
    const resultObj = await db.query(text);
    if (!resultObj.rows.length) {
      console.log('no results found')
      return res.status(404).json('user not found')
    }
    const dbPass = resultObj.rows[0].password;
    await bcrypt
      .compare(password, dbPass)
      .then(isUserFound => {
        if (!isUserFound) {
          return res.status(400).json('invalid password');
        }

        // User is found
        else {
          res.locals.userId = resultObj.rows[0].profile_id;
          return next();
        }
      })
      .catch(err => {
        next({
          log: `userController.verifyUser: ERROR: ${err}`,
          message: { err: 'userController.verifyUser: ERROR: Check server logs for details' },
        });
      })
  }
  catch (err) {
    next({
      log: `userController.verifyUser: ERROR: ${err}`,
      message: { err: 'userController.verifyUser: ERROR: Check server logs for details' },
    });
  }
}

module.exports = userController;
