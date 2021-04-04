import React from 'react'

export default function MovieCard({ data }) {
  return (
    <div className="movie-card mx-3 col-md-2">
      <img className="movie-poster" src={data?.Poster} />
      <p>{data?.Title} <br /> {data?.imdbRating}</p>
    </div>
  )
}
