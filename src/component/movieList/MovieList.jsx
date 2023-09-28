import React, { useEffect, useState } from "react";
import "./MovieList.css"
import Card from "../card/Card"
import { useParams } from "react-router-dom";

const MovieList = () => {
   const [ movieList, setMovieList ] = useState([]);
   const { type } = useParams();
   const api_key = process.env.REACT_APP_TMDB_API_KEY;

   useEffect(() => {
      getData()
   });

   const getData = () => {
      fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=${api_key}`)
      .then(res => res.json())
      .then(data => setMovieList(data.results))
   }

   return (
      <div className="movie__list">
         <h2 className="list__title">{(type ? type : "popular").toUpperCase()}</h2>
         <div className="list__cards">
            {movieList.map((movie, index)=>(
               <Card movie={movie} key={index} />
            ))}
         </div>
      </div>
   )
}

export default MovieList