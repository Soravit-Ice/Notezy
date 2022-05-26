const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      db = require('../model/config'),
      passportJWT = require("passport-jwt"),
      JWTStrategy = passportJWT.Strategy,
      ExtractJWT  = passportJWT.ExtractJwt
      brcypt = require('bcrypt');
const Users = db.user;
require('dotenv').config()

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, 
    (username, password, cb) => {        
     
     return Users.findOne({where : {username : username}})
           .then(user => {
               if (!user) {
                   return cb(null, false, {message: 'Incorrect email or password.'})
               }               
               return brcypt.compare(password , user.password , (err , match) =>{
                   if(err){
                       return cb(err);
                   }else{
                       if(!match){
                           return cb(null ,false,{data: 'Incorrect email or password.'} )
                       }else{
                           return cb(null ,user,{messsage : "login auth"} )
                       }
                   }
               })
          })
          .catch(err => cb(err))
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.JWT_SECRET
},
(jwtPayload, cb) => {
return Users.findOne({where : {userId: jwtPayload.userId}})
     .then(user => {
        return cb(null, user);
     })
     .catch(err => {
         return cb(err);
     });
}
));




