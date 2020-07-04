// 1. Require Express
const express = require("express");
const path = require("path");
const fs = require("fs");

// 2. Create an instance of Express - app
const app = express();

// 3. Create a PORT
const PORT = process.env.PORT || 3000;

// Add data-parsing boilerplate to read POST body.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View Routes -> HTML
// Since the browser can only make GET requests, we only write GET Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/index.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/admin.html"));
});

// API Routes -> JSON
// Create GET and POST Routes
app.get("/api/quotes", (req, res) => {
  fs.readFile("./db/quotes.json", "utf8", (err, data) => {
    if (err) {
      return res.send("An error occurred reading your data.");
    }
    const arrayOfQuotes = JSON.parse(data);
    res.json(arrayOfQuotes);
  });
});

/**
 * Add a new quote via a POST request
 */
app.post("/api/quotes", (req, res) => {
  // Read data from the file
  fs.readFile("./db/quotes.json", "utf8", (err, data) => {
    if (err) {
      return res.send("An error occurred reading your data.");
    }
    // Manipulate the data
    const arrayOfQuotes = JSON.parse(data);
    arrayOfQuotes.push(req.body);
    // Write the data back to file
    fs.writeFile(
      "./db/quotes.json",
      JSON.stringify(arrayOfQuotes),
      "utf8",
      (err) => {
        if (err) {
            return res.send("An error occurred writing your data.");
        //   return res.json({
        //     message: "An error occurred adding a new quote.",
        //     data: null,
        //     err: true,
        //   });
        }
        // res.json({
        //   message: "Successfully added new quote.",
        //   data: arrayOfQuotes,
        //   err: false,
        // });
        res.json(arrayOfQuotes);
      }
    );
  });
});

// 4. Listen on that port
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});