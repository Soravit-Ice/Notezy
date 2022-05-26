const router = require('express').Router();
const db = require('../model/config');
const brcypt = require('bcrypt');
const  passport = require('passport');
const jwt = require('jsonwebtoken');
const Users = db.user;

require('dotenv').config()

    router.post("/login", async(req , res , next) => {
       
            passport.authenticate('local', {session: false}, (err, user, info) => {
                if (err) return next(err)
                if(user) {
                    const token = jwt.sign({user: user.username , userId:user.userId}, process.env.JWT_SECRET , { expiresIn: '5d' })
                    return res.json({data:"login success", token , status:"200" , user:{id:user.userId , firstname:user.firstname}})
                } else {
                    return res.status(200).json({data: 'Incorrect email or password.' , status:"400"})
                 }
            })(req, res, next);
    
           })
    
    router.post("/register" , async(req , res) => {
        const {username , password , firstname , lastname , phone} = req.body;
        if(password != undefined && password != null && password != "" && password != " "){
        await Users.findOne({
                where : {username : username} 
            }).then( async (data) => {
                if(data != null && data.username === username) {
                    res.json({data:"username is alrady in database" , status:"400"})
                }else{
                    await Users.findOne({
                        where :{ phone : phone}
                    }).then(async (data) => {
                        if(data != null && data.phone === phone){
                            res.json({data:"phone is alrady in database",status : "400" })
                        }else{
                            await brcypt.hash(password , 256).then( (hash) => {
                                Users.create({
                                    firstname: firstname,
                                    lastname: lastname,
                                   username : username,
                                   password: hash,
                                   phone: phone
                               }).then(() => {
                                   res.json({data : "Registed success" , status: "200"});
                               }).catch( (err) => {
                                   if(err){
                                       res.status(400).json({err:err});
                                   }
                               })
                           })
                        }
                    })
                }

            })
    }else{
        return res.json({err : "password in undefind"})
    }
    })
    

    router.post("/logout" ,passport.authenticate('jwt', {session: false}),async(req , res) =>{
        res.clearCookie('access_token');
        res.json("Success to romove token")
    })
    



module.exports = router

