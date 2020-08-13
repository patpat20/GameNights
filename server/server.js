const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const port = process.env.PORT || 3000;


app.use(express.json())
app.use(cookieParser())

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));

  app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '../index.html'));
  });
}

app.get('/test', (req, res) => {
  console.log('test received')
  // return res.send('hello')
  return res.redirect('/main?test=1')
})

// >>>>> login <<<<<<
const userController = require('./controllers/userController');

app.post('/api/signup',
  // userController.createUser,
  // cookieController.setSSIDCookie,
  // sessionController.startSession,
  userController.addProfile,
  (req, res) => res.status(200).json(res.locals.newProfile)
);


app.post('/api/login',
  // userController.verifyUser, 
  // cookieController.setSSIDCookie, 
  // sessionController.startSession, 
  userController.verifyUser,
  (req, res) => {
    return res.status(200).json('you have logged in');
  });

// >>>>> adjust event/games db <<<<<<
const apiRouter = require('./routes/api');

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;