require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const Session = require('express-session');
const path = require('path');
const FileStore = require('session-file-store')(Session);
const { hashPassword, verifyPassword, verifyToken, verifyTokenById } = require("./auth");

const port = process.env.APP_PORT ?? 5000;

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

const userHandlers = require("./userHandlers");
const movieHandlers = require("./movieHandlers");

app.use(Session({
  store: new FileStore({
    path: path.join(__dirname, '/tmp'),
    encrypt: true
  }),
  secret: 'Super Secret !',
  resave: true,
  saveUninitialized: true,
  name: 'sessionId'
}));

app.get("/session-in", (req, res) => {
  req.session.song = "be bop a lula";
  res.end();
});
app.get("/session-out", (req, res) => {
  res.send(req.session.song);
});

app.get("/", welcome);
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);

app.post("/api/users", hashPassword, userHandlers.postUser);
app.post("/api/login", userHandlers.getUserByEmailWithPasswordAndPassToNext, verifyPassword);


app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.use(verifyToken);

app.post("/api/movies", movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);


app.put("/api/users/:id", verifyTokenById, userHandlers.updateUser);
app.delete("/api/users/:id", verifyTokenById, userHandlers.deleteUser);


