import React, { useEffect, useState } from "react";
import "./Home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import { AiFillStar } from 'react-icons/ai';
import MovieList from "../../component/movieList/MovieList";

const Home = () => {
   const [popularMovies, setPopularMovies] = useState([])
   const api_key = process.env.REACT_APP_TMDB_API_KEY;

   useEffect(() => {
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`)
         .then(res => res.json())
         .then(data => setPopularMovies(data.results))
   }, [api_key]);

   return (
      <div className="poster">
         <Carousel
            showThumbs={false}
            autoPlay={true}
            transitionTime={3}
            infiniteLoop={true}
            showStatus={false}
         >
            {
               popularMovies.map((movie) => (
                  <Link style={{textDecoration: "none", color: "white"}} to={`/movie/${movie.id}`} key={movie.id}>
                     <div className="posterImage">
                        <img src={`https://image.tmdb.org/t/p/original/${movie && movie.backdrop_path}`} alt={movie && movie.title} />
                     </div>
                     <div className="posterImage__overlay">
                        <div className="posterImage__title">{movie ? movie.original_title : ""}</div>
                        <div className="posterImage__runtime">
                           {movie ? movie.release_date : ""}
                           <span className="posterImage__rating">
                              {movie ? movie.vote_average : ""}
                              <AiFillStar />
                           </span>
                        </div>
                        <div className="posterImage__description">{movie ? movie.overview : ""}</div>
                     </div>
                  </Link>
               ))
            }
         </Carousel>
         <MovieList />
      </div>
   )
}

export default Home;