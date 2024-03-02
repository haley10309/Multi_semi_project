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

  handleImageClick = async (movie_name) => { //영화 클릭했을 때
    try {
      // Post movie_name to the API endpoint
      await fetch("/api/movie_name", { //영화 이름만 보낼 api
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movie_name }),
      });
      // Navigate to boardList.js
      this.props.history.push("/board");
    } catch (error) {
      console.error("Error posting movie name:", error);
    }
  };

  render() {
    return (
      <div className="cover">
        <div className="row_box">
          {this.state.movies.map((movie) => (
            <div className="box" key={movie.number}>
              <NavLink to={{ pathname: "/board"}}>
                <img 
                src={movie.img_url} alt={movie.movie_name} 
                onClick={() => this.handleImageClick(movie.movie_name)} 
                />
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
