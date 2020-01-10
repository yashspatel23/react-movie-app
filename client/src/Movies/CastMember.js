import React, { Component } from "react";

class CastMember extends Component {
  state = {
    baseImageUrl: "https://image.tmdb.org/t/p/w500/"
  };

  render() {
    var imgSrc;
    if (this.props.member.profile_path) {
      imgSrc = this.state.baseImageUrl + this.props.member.profile_path;
    }
    return (
      <div className="cast">
        <img src={imgSrc} alt={this.props.member.name} />
        <p className="castName">{this.props.member.name}</p>
        <p className="castRole">{this.props.member.character}</p>
      </div>
    );
  }
}

export default CastMember;
