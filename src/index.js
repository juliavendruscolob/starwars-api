const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

app.listen(port, () => {
  console.log("App running...");
});

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mongodb");

const Film = mongoose.model("Film", {
  title: String,
  description: String,
  imageUrl: String,
  trailerUrl: String,
});

app.post("/", async (req, res) => {
  const film = new Film({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    trailerUrl: req.body.trailerUrl,
  });
  await film.save();
  res.send(film);
});

app.get("", async (req, res) => {
  const films = await Film.find();
  res.send(films);
});

app.get("/:id", async (req, res) => {
  const film = await Film.findById(req.params.id);
  res.send(film);
});

app.put("/:id", async (req, res) => {
  const film = await Film.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    trailerUrl: req.body.trailerUrl,
  });
  return res.send(film);
});

app.delete("/:id", async (req, res) => {
  const film = await Film.findByIdAndDelete(req.params.id);
  res.send(film);
});
