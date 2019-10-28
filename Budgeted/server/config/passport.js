var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

 module.exports = function(passport){
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.secret;
console.log(config.secret);
let strategy = new JwtStrategy(opts, function(jwt_payload, next) {
  console.log("payload received", jwt_payload.data[0].email);
  let user = User.getUserByEmail(jwt_payload.data[0].email, (err, user) => {
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
});

passport.use(strategy);

}
