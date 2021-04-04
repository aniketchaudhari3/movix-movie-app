import React from 'react'
import MovieCard from './MovieCard'
import { movies } from '../data/movies'

export default function Wishlist() {
  return (
    <div className="mt-5">
      <h3 className="my-3">Your Favourite movies</h3>
      <div className="d-flex">
        {movies.map((item, index) => <MovieCard data={item} />)}
      </div>
    </div>
  )
}
