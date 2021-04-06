import React from 'react'
import { Link } from 'react-router-dom'

export default function MovieCard({ data }) {
  return (
    <div className="movie-card mx-4 my-2 col-md-1">
      <Link to={`movie/${data?.imdbID}`}>
        <div className="">
          <img className="movie-poster" src={data?.Poster} />
        </div>
        <div className="movie-detail">
          <span className="movie-title mt-1">{data?.Title}</span>
          {data?.imdbRating !== 'N/A' && <span className="movie-rating">⭐ {data?.imdbRating}</span>}
        </div>
      </Link>
    </div>
  )
}
