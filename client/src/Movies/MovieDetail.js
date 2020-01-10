import React, { Component } from "react";
import { Link } from "react-router-dom";
import MovieItem from "./MovieItem";
import CastMember from "./CastMember";

class MovieDetail extends Component {
  state = {
    id: null,
    baseImageUrl: "https://image.tmdb.org/t/p/w500/",
    movie: {},
    cast: [],
    similar: []
  };

  componentDidMount() {
    this.setState({ id: this.props.match.params.id });

    this.callApi(this.props.match.params.id)
      .then(res => {
        this.setState({
          movie: res.movie,
          cast: res.credits,
          similar: res.similar.splice(0, 4)
        });
      })
      .catch(err => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      const currentId = nextProps.match.params.id;
      this.setState({ id: currentId });

      this.callApi(currentId)
        .then(res => {
          this.setState({
            movie: res.movie,
            cast: res.credits,
            similar: res.similar.splice(0, 4)
          });
        })
        .catch(err => console.log(err));
    }
  }

  callApi = async id => {
    const response = await fetch("/api/detail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: id })
    });
    const body = await response.json();
    return body;
  };

  render() {
    return (
      <div>
        <Link className="backbutton" to="/">
          &larr;
          <span>Back</span>
        </Link>

        <div className="movieInfo">
          <div className="poster">
            <img
              src={this.state.baseImageUrl + this.state.movie.poster_path}
              alt={this.state.movie.title}
            />
          </div>

          <div className="content">
            <p className="title">{this.state.movie.original_title}</p>
            <p className="releasedate">
              Released: {this.state.movie.release_date}
            </p>
            <div className="stats">
              <p>Runtime: {this.state.movie.runtime} Minutes</p>
              <p>Rating: {this.state.movie.vote_average} / 10</p>
            </div>
            <h3>Synopsis</h3>
            <p className="overview">{this.state.movie.overview}</p>

            <h4>Similar Movies</h4>
            <div className="similarMovies">
              {this.state.similar.map(item => (
                <MovieItem key={item.id} movie={item} />
              ))}
            </div>
          </div>
        </div>

        <h3>Cast Members</h3>
        <div className="movieCast">
          {this.state.cast.map(item => (
            <CastMember key={item.cast_id} member={item} />
          ))}
        </div>
      </div>
    );
  }
}

export default MovieDetail;
