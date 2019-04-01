const express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');
const config = require('../config/config');
const Request = require('request');
const router = express.Router();
module.exports = router;

router.post('/register', asyncHandler(register), login);
router.post('/login', passport.authenticate('local', { session: false }), login);
router.get('/me', passport.authenticate('jwt', { session: false }), login);
router.post('/location', asyncHandler(getLocation));


async function register(req, res, next) {
  let user = await userCtrl.insert(req.body);
  user = user.toObject();
  delete user.hashedPassword;
  req.user = user;
  next()
}

function login(req, res) {
  let user = req.user;
  let token = authCtrl.generateToken(user);
  res.json({ user, token });
}

async function getLocation(req, res, next) {
  Request.get("https://geoip-db.com/json/", (error, response, body) => {
    if(error) {
        return console.dir(error);
    }    
    user.locationData = JSON.parse(body);
    console.log(JSON.parse(body));
  });
}
