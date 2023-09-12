//Importing all the dependencies
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { router } = require("./Routes/gptRouter");

//Initializing express app
const app = express();

//Defining PORT
const PORT = process.env.PORT || 4500

//Defining middlewares for express app
app.use(express.json());
app.use(cors());
app.use("/api",router)

//Listening to express server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});




