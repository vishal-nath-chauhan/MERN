const express = require("express");
const app = express();
const dotenv=require('dotenv');
const cookieParser =require('cookie-parser');

dotenv.config({path:'./config.env'})
const PORT=process.env.PORT;

const userSchema=require('./models/userSchema');
app.use(express.json())
app.use(cookieParser()) 
app.use(require('./router/route'));
require('./DB/conn') // calling mongodb 

app.listen(PORT, () => {
	console.log("listening at ", PORT);
});
