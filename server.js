const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
const port = process.env.PORT || 5000;

const movieDbUrl = "https://api.themoviedb.org/3";
const apiKeyUrl = "?api_key=ca5da49a543ff21f389ce77348803fcd";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/movies", (req, res) => {
  request(
    movieDbUrl + "/movie/popular" + apiKeyUrl,
    { json: true },
    (err, resp, body) => {
      if (err) {
        return console.log(err);
      }
      res.send({ movies: body.results });
    }
  );
});

app.post("/api/search", (req, res) => {
  var searchTerm = req.body.search;
  if (searchTerm) {
    request(
      movieDbUrl +
        "/search/movie" +
        apiKeyUrl +
        "&query=" +
        searchTerm +
        "&language=en-US&page=1&include_adult=false",
      { json: true },
      (err, resp, body) => {
        if (err) {
          return console.log(err);
        }
        res.send({ movies: body.results });
      }
    );
  } else {
    request(
      movieDbUrl + "/movie/popular" + apiKeyUrl,
      { json: true },
      (err, resp, body) => {
        if (err) {
          return console.log(err);
        }
        res.send({ movies: body.results });
      }
    );
  }
});

app.post("/api/detail", (req, res) => {
  var movieID = req.body.id;
  if (movieID) {
    var movieDetails = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/" + movieID,
      qs: { language: "en-US", api_key: "ca5da49a543ff21f389ce77348803fcd" },
      body: "{}",
      json: true
    };

    var castDetails = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/" + movieID + "/credits",
      qs: { language: "en-US", api_key: "ca5da49a543ff21f389ce77348803fcd" },
      body: "{}",
      json: true
    };

    var similarMovies = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/" + movieID + "/similar",
      qs: { language: "en-US", api_key: "ca5da49a543ff21f389ce77348803fcd" },
      body: "{}",
      json: true
    };

    request(movieDetails, function(err, resp, body) {
      if (err) throw new Error(err);
      request(castDetails, function(err2, resp2, body2) {
        if (err2) throw new Error(err2);

        request(similarMovies, function(err3, resp3, body3) {
          if (err2) throw new Error(err3);
          res.send({
            movie: body,
            credits: body2.cast,
            similar: body3.results
          });
        });
      });
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
