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

//routes api
//-------------------------------
// DISPLAY notes///////////
app.get("/api/notes", function (req, res) {
  let dbPath = require("./db/db.json");
  return res.send(dbPath);
});

// POST notes///////////////
app.post("/api/notes", function (req, res) {
  var body = {
    title: req.body.title,
    text: req.body.text,
  };
  let filePath = path.join(__dirname, "./db/db.json");

  fs.appendFile(filePath, JSON.stringify(body), function (err) {
    if (err) {
      throw err;
    }
    res.status(200).json({
      message: "File successfully saved",
    });
  });
});

// // DELETE notes
// app.delete("/api/notes/:id", function (req, res) {
//   const id = req.params._id;
//   const oldNotes = req.body;
//   Notes.removeNotes(id, (err, oldNotes) => {
//     if (err) {
//       throw err;
//     }
//     res.json(oldNotes);
//   });
// });

//server is listening
//-------------------------------
app.listen(PORT, () => {
  console.log(`App listening on  PORT: http://localhost:${PORT}`);
});
