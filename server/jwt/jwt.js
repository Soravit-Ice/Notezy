const { verify } = require("jsonwebtoken");


  
  const validateToken = async (req, res, next) => {
    let authToken = req.headers.authorization;
  
    if (!authToken){
      res.status(400).json({ error: "User not Authenticated!" , status:"400"});
    }else{
      try {
        const token = authToken.split(' ')
        console.log(token[1])
        const vaildToken =  await jwt.verify(token[1],process.env.JWT_SECRET)
        console.log(vaildToken)
        if (vaildToken) {
          req.user = true
          return next();
        }else{
          res.status(400).json({ error: "User not Authenticated!" , status:"400"});
        }
       } catch (e) {
        res.status(400).json({ error: e });
       }
    }
  
    
  };
  
  module.exports = {validateToken };
