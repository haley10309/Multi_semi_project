import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import "./boardList.scss";

class BoardList extends Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    this.callApi()
      .then((res) => this.setState({ movies: res }))
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/second_api/movie_info");
    const body = await response.json();
    return body;
  };

  render() {
    return (
      <div>
        <div className="movie_info">
          {this.state.movies.map((movie) => (
            <div>
            <div className="movie_image">
              <img src={movie.img_url} alt={movie.movie_name} />
            </div>

            <div className="movie_explanation">movie_explanation
            <br/>
            <ul className="movie_info_category" >{movie.movie_name}</ul>
            <ul className="movie_info_category">별점 : {movie.star_rate}</ul>
            <ul className="movie_info_category">감독 : {movie.director}</ul>
            </div>
            </div>
          ))}

        
        </div>
        <div className="review_list">movie review</div>
      </div>
    );
  }
}

export default BoardList;