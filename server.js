const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const db = require('./db')
const seed = require('./db/seed')
const api = require('./api/index')
const { User } = db.models
const session = require('express-session')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: 'graceshopper',
  resave: false,
  saveUninitialized: false
}))

// auth -- login
app.post('/login', (req, res, next) => {
  User.findOne({where: req.body})
  .then( user => {
    if (user) {
      req.session.userId = user.id
      res.send(user)
    }
    else {
      res.sendStatus(401)
    }
  })
  .catch(next)
})

// auth -- signup
app.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.session.userId = user.id
      res.send(user)
    })
    .catch(next)
})

// auth -- logout
app.put('/logout', (req, res, next) => {
  if (req.session && req.session.userId) {
    req.session.destroy()
    return res.send('See you again!')
  }
  res.send('you are not logging in!')
})


app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api', api)

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

db.sync()
.then(seed)
.then( () => {

  app.listen(port, () => {
    console.log(`listening on port ${port}`)
  });

})


module.exports = app;
