import React, { Component } from "react";
import MovieList from "./Movies/MovieList";
import MovieDetail from "./Movies/MovieDetail";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

class App extends Component {
  state = {
    movies: [],
    search: ""
  };

  componentDidMount() {
    this.callApi()
      .then(res => {
        this.setState({ movies: res.movies });
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/movies");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ search: this.state.search })
    });
    const body = await response.json();
    this.setState({ movies: body.movies });
  };

  movieDetailPage = movie => {
    return <MovieDetail movie={movie} />;
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={props => (
              <React.Fragment>
                <div className="searchMovie">
                  <form onSubmit={this.handleSubmit}>
                    <input type="text"
                      placeholder="Enter movie name..."
                      value={this.state.search}
                      onChange={e => this.setState({ search: e.target.value })}
                    />
                    <button type="submit">Search</button>
                  </form>
                </div>

                <div className="movieCollection">
                  <MovieList movies={this.state.movies} />
                </div>
              </React.Fragment>
            )}
          />

          <Route path="/movie/:id" component={MovieDetail} />
        </div>
      </Router>
    );
  }
}

export default App;
