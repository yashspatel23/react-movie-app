import React, { Component } from "react";
import MovieItem from "./MovieItem";
import PropTypes from "prop-types";

class MovieList extends Component {
  render() {
    return this.props.movies.map(item => (
      <MovieItem key={item.id} movie={item} />
    ));
  }
}

MovieList.propTypes = {
  movies: PropTypes.array.isRequired
};

export default MovieList;
