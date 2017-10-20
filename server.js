const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const db = require('./db');
const seed = require('./db/seed');
const api = require('./api/index');
const { User, Order } = db.models;
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const new_seed = require('./db/new_seed');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(session({
  secret: 'graceshopper',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

process.env.GOOGLE_CLIENT_ID = '877483500262-o0ogi1h7t9jq4a0ak3qon71g6hemnppj.apps.googleusercontent.com';
process.env.GOOGLE_CLIENT_SECRET = 'RUzWbhHDGbBb-_t_ptAT6FfD'
process.env.GOOGLE_CALLBACK = 'http://localhost:3000/auth/google/callback'

app.get('/auth/google', passport.authenticate('google', { scope: 'email' }));

passport.use(
  new GoogleStrategy({
    clientID: '877483500262-o0ogi1h7t9jq4a0ak3qon71g6hemnppj.apps.googleusercontent.com',
    clientSecret: 'RUzWbhHDGbBb-_t_ptAT6FfD',
    callbackURL: '/auth/google/callback'
  },
  function (token, refreshToken, profile, done) {
    console.log('---', 'in verification callback', profile, '---');
    var info = {
      name: profile.displayName,
      email: profile.emails[0].value,
    };
    User.findOrCreate({
      where: {googleId: profile.id},
      defaults: info
    })
    .spread(function (user) {
      done(null, user);
    })
    .catch(done);
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
  .then(function (user) {
    done(null, user);
  })
  .catch(function (err) {
    done(err);
  });
});

// handle the callback after Google has authenticated the user
app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/', // or wherever
    failureRedirect: '/' // or wherever
  })
);


// app.use(function (req, res, next) {
//   console.log('session', req.session, req.user);
//   next();
// });

app.use(function (req, res, next) {
  if (req.user) {
    req.logIn( req.user, function(){
      req.session.userId = req.user.id
    })
  }
  next();
});

app.use(function (req, res, next) {
  //console.log('session', req.session, req.user);
  next();
});

app.use(function (req, res, next) {
  if (req.user) {
    req.logIn( req.user, function(){
      req.session.userId = req.user.id
    })
  }
  next();
});

// auth -- local strategy login
app.post('/login', (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (user) {
        if (user.verifyPassword(req.body.password)) {
          req.session.userId = user.id;
          res.send(user);
        }
        else {
          res.send("Incorrect Password")
        }
      }
      else {
        res.send('Email does not exist')
      }
    })
    .catch(next)
})

// auth -- local strategy signup
app.post('/signup', (req, res, next) => {
  let newUser;
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (user) {
        return res.send('already exist');
      }
      else {
        User.create(req.body)
          .then(user => {
            newUser = user;
            req.session.userId = user.id;
            return Order.create({})
          })
          .then( order => {
            return order.setUser(newUser);
          })
          .then(() => {
            res.send(newUser);
          })

      }
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
  console.error(err.message)
  res.status(500).send('Something broke!')
})

// db.sync()
//   .then(new_seed)
//   .then(() => {

//     app.listen(port, () => {
//       console.log(`listening on port ${port}`)
//     });

//   })

  app.listen(port, () => {
    console.log(`listening on port ${port}`)
  });
