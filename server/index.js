const express = require("express");
const authapi = require("./controller/routeauth");
const noteapi = require("./controller/routenote");
const folderapi = require("./controller/routefolder");
const protected = require("./controller/routerprotect");
const cookieParser = require("cookie-parser");
const db = require('./model/config');
const passport = require('passport');
const app = express();
const cors = require('cors');
require('./config/passport');


require('dotenv').config()

let corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
  }
app.use(cookieParser());
app.use(express.json())



app.use("/notezy/auth",cors(corsOptions) ,authapi);
app.use("/notezy/note",cors(corsOptions),passport.authenticate('jwt', {session: false}) , noteapi);
app.use("/notezy/folder",cors(corsOptions),passport.authenticate('jwt', {session: false}) , folderapi);
app.use("/notezy",cors(corsOptions),passport.authenticate('jwt', {session: false}) , protected);



db.sequelize.sync().then(()=> {
    app.listen(process.env.PORT || 8000, () => console.log(`Running on port : ${process.env.PORT}`))
});

