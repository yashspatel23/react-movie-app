import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class MovieItem extends Component {
  state = {
    baseImageUrl: "https://image.tmdb.org/t/p/w500/"
  };

  render() {
    return (
      <div className="movieItem">
        <Link to={"/movie/" + this.props.movie.id}>
          <div className="poster">
            <img
              src={this.state.baseImageUrl + this.props.movie.poster_path}
              alt={this.props.movie.original_title}
            />
          </div>

          <div className="title">{this.props.movie.original_title}</div>
        </Link>
        <div className="release">{this.props.movie.release_date}</div>
      </div>
    );
  }
}

MovieItem.propTypes = {
  movie: PropTypes.object.isRequired
};

export default MovieItem;
