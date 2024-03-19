import React, { useState, useEffect } from "react";
import "./Home.scss";
import { NavLink, useLocation } from "react-router-dom";
import Rating from "@mui/material/Rating";

function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") || false
  );

  useEffect(() => {
    const fetchData = async () => {
    
      try {
        const response = await fetch("/myapp/movieList");
        const body = await response.json();
        setMovies(body);
        console.log(body);
      } catch (error) {
        console.log(error);
      }
    };
    if (isLoggedIn === null || isLoggedIn === undefined) {
      // If so, set isLoggedIn to false
      setIsLoggedIn(false);
      // And also set the LoginID to "guest"
      localStorage.setItem("LoginID", "guest");
      window.location.reload();
    }

    fetchData();
  }, [isLoggedIn]);

  return (
    <div className="cover">
      <div className="row_box">
        {movies.map((movie) => (
          <div className="box" key={movie.movie_id}>
            <NavLink to={`/board?movie_id=${movie.movie_id}`}>
              <img src={movie.img_url} alt={movie.title} />
            </NavLink>
            <h2 className="movie_title">{movie.title}</h2>
            <Rating
              name="user_star_rating"
              value={movie.averagerating}
              size="small"
              readOnly
              precision={0.1}
            />
            <p className="star_rate">별점 : {movie.averagerating}점</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
