//dependencies
// ------------------------------
const express = require("express");
var path = require("path");
const fs = require("fs");

//setting up express
//-------------------------------
const app = express();
const PORT = 3000;

// seting up express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes HTML
//-------------------------------

//route that sends user to homepage
app.get("*", (res, req) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

//route that sends user to notes page
app.get("/notes", (res, req) => {
  res.sendFile(path.join(__dirname, "notes.html"));
});

//server is listening
//-------------------------------
app.listen(PORT, () => {
  console.log(`App listening on  PORT: http://localhost:${PORT}`);
});
