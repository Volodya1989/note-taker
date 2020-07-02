//dependencies
// ------------------------------
const express = require("express");
const fs = require("fs");

//setting up express
//-------------------------------
const app = express();
const PORT = 3000;

//server is listening
//-------------------------------
app.listen(PORT, ()=>{
    console.log(`App listening on  PORT: http://localhost:${PORT}`)
});


