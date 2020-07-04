//Volodymyr Petrystya  07/03/2020
//dependencies
// ------------------------------
const express = require("express");
var path = require("path");
const fs = require("fs");

//setting up express
//-------------------------------
const app = express();
const PORT = process.env.PORT || 3000;

// seting up express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// HTML route
//-------------------------------
//route that sends user to notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/assets/notes.html"));
});

// api routes
//-------------------------------
// DISPLAY notes///////////
app.get("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      return res.send("An error occurred reading your data.");
    }
    const arrayOfNotes = JSON.parse(data);
    res.json(arrayOfNotes);
  });
  // let dbPath = require("./db/db.json");
  // return res.send(dbPath);
});

// POST notes///////////////
app.post("/api/notes", function (req, res) {
  let filePath = path.join(__dirname, "./db/db.json");
  const body = {
    title: req.body.title,
    text: req.body.text,
  };

  fs.readFile(filePath, function (err, data) {
    if (err) throw err;

    var arrayOfNotes = JSON.parse(data);
    arrayOfNotes.push(body);
    let i = 1;
    //adds id to each object
    arrayOfNotes.map((obj) => {
      obj["id"] = i;
      i++;
    });
    fs.writeFile(
      filePath,
      JSON.stringify(arrayOfNotes, null, 4),
      "utf8",
      function (err) {
        if (err) {
          throw err;
        }
        res.json(arrayOfNotes);
      }
    );
  });

  //some problem with displaying new note right away!!!!!!!!!!!!!!!!!!!!!!!!
  // return res.send(filePath);
});

// DELETE notes
app.delete("/api/notes/:id", function (req, res) {
  let filePath = path.join(__dirname, "./db/db.json");
  fs.readFile(filePath, function (err, data) {
    if (err) throw err;

    let arrayOfNotes = JSON.parse(data);
    let objID = req.params.id;
    let delObj = arrayOfNotes.find((user) => user.id == objID);
    let delIndex = arrayOfNotes.indexOf(delObj);
    arrayOfNotes.splice(delIndex, 1);

    fs.writeFile(filePath, JSON.stringify(arrayOfNotes, null, 4), "utf8", function (
      err
    ) {
      if (err) {
        throw err;
      }
      res.json(arrayOfNotes);

    });
    // res.send(filePath);
  });
});

// HTML route
//-------------------------------
//route that sends user to homepage
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/assets/index.html"));
});

//server is listening
//-------------------------------
app.listen(PORT, () => {
  console.log(`App listening on  PORT: http://localhost:${PORT}`);
});
