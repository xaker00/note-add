const express = require("express");
const path = require("path");
const db = require("./lib/db");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));

app.get("/api/notes", (req, res) => {
  res.json(db.GetNotes());
});

app.post("/api/notes", (req, res) => {
  const note = req.body;
  const result = db.AddNote(note);
  res.json(result);
});

app.put("/api/notes/:id", (req, res) => {
  let notes = db.GetNotes(req.params.id);

  if (notes.length === 1) {
    let noteToBeSaved = notes[0];
    console.log(noteToBeSaved);
    if ("title" in req.body) noteToBeSaved.title = req.body.title;
    if ("text" in req.body) noteToBeSaved.text = req.body.text;
    db.EditNote(noteToBeSaved);
    res.json(db.GetNotes(req.params.id));
  }
});

app.delete("/api/notes/:id", (req, res) => {
    if(req.params.id) db.DeleteNote(req.params.id)
});

// GET Route for homepage
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
