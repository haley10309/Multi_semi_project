/* Home.js */
import React, { Component } from "react";
import "./Home.scss";
import { NavLink } from "react-router-dom";

class Home extends Component {
  state = {
    movies: [],
  };
  componentDidMount() {
    this.callApi()
      .then((res) => this.setState({ movies: res }))
      .catch((err) => console.log(err));
  }
  callApi = async () => {
    const response = await fetch("/api/movies");
    const body = await response.json();
    return body;
  };

  render() {
    return (
      <div className="cover">
        <div className="row_box">
          {this.state.movies.map((movie) => (
            <div className="box" key={movie.number}>
              <NavLink to={"/board"}>
                <img src={movie.img_url} alt={movie.movie_name} />
              </NavLink >
              <h2>{movie.movie_name}</h2>
              <p>{movie.star_rate}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
