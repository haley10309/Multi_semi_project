import React, { useState, useEffect } from "react";
import "./Home.scss";
import { NavLink, useLocation } from "react-router-dom";

function Home() {
  const [movies, setMovies] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
    
      try {
        
        const response = await fetch("/movieList");
        
        const body = await response.json();
        setMovies(body);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="cover">
      <div className="row_box">
        {movies.map((movie) => (
          <div className="box" key={movie.movie_id}>
            <NavLink to={`/board?movie_number=${movie.movie_id}`}>
              <img src={movie.img_url} alt={movie.title} />
            </NavLink>
            <h2>{movie.title}</h2>
            <p>{movie.averagerating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
