const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

const apiRouter = require('./routes/api');

app.use(express.json())

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));

  app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '../index.html'));
  });
}
// app.use('/build', express.static(path.join(__dirname, '../build')));

// app.get('/', (req, res) => {
//   return res.sendFile(path.join(__dirname, '../index.html'));
// });

app.get('/test', (req, res) => {
  console.log('test received')
  return res.send('hello')
})
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