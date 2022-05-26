const router = require('express').Router();


router.get("/protectToken" , (req ,res) => {

    return res.status(200).json({status:"200" , data:"Autenticated"})
});

module.exports = router