import React, { useState, useEffect } from "react";
import "./Home.scss";
import { NavLink, useLocation } from "react-router-dom";

function Home() {
  const [movies, setMovies] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
    
      try {
        
<<<<<<< HEAD
        const response = await fetch("/myapp/movieList");
=======
        const response = await fetch("myapp/movieList");
>>>>>>> f2db21f4de4ff726c121fe8cf323011cb5942f78
        
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
