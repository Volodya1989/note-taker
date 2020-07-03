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
app.use(express.static("public"));

//routes HTML
//-------------------------------

//route that sends user to homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/assets/index.html"));
});

//route that sends user to notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/assets/notes.html"));
});
//Data
//-------------------------------
let newNotes = [];

//-------------------------------

//routes api
//-------------------------------
// DISPLAY notes///////////
app.get("/api/notes", function (req, res) {
  let dbPath = require("./db/db.json");
  return res.send(dbPath);
});

// POST notes///////////////
app.post("/api/notes", function (req, res) {
  let filePath = path.join(__dirname, "./db/db.json");
  const body = {
    title: req.body.title,
    text: req.body.text,
  };
  // newNotes.push(body);

  fs.readFile(filePath, function (err, data) {
    if (err) throw err;

    var json = JSON.parse(data);
    json.push(body);
    let i = 1;
    //adds id to each object
    json.map((n) => {
      n["id"] = i;
      i++;
    });
    fs.writeFile(filePath, JSON.stringify(json, null, 4), "utf8", function (
      err
    ) {
      if (err) {
        throw err;
      }
    });
  });
  //some problem with displaying new note right away!!!!!!!!!!!!!!!!!!!!!!!!
  return res.send(filePath);
});

// DELETE notes
app.delete("/api/notes/:id", function (req, res) {
  let filePath = path.join(__dirname, "./db/db.json");
  fs.readFile(filePath, function (err, data) {
    if (err) throw err;

    let json = JSON.parse(data);
    let deleteId = req.params.id; //Get the id through req.params.id of the object you are going to delete
    let deleteObj = json.find((user) => user.id == deleteId); // As you have only Id of the object, we want to get the entire object from the array. find() will fetch the object from the array whose id is equal to deleteId and assign it to deleteObj.
    let deleteIndex = json.indexOf(deleteObj); //Find the index of the object fetched from the JSON array.
    json.splice(deleteIndex, 1); // Splice/ remove the object from the JSON Array.

    fs.writeFile(filePath, JSON.stringify(json, null, 4), "utf8", function (
      err
    ) {
      if (err) {
        throw err;
      }
    });
    res.send(filePath);
  });
});

//server is listening
//-------------------------------
app.listen(PORT, () => {
  console.log(`App listening on  PORT: http://localhost:${PORT}`);
});
