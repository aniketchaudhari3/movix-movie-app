import React from 'react'
import Navbar from './Navbar'
import MovieCard from './MovieCard'
import { movies } from '../data/movies'

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="">
        <div className="d-flex">
          {movies.map((item, index) => <MovieCard data={item} />)}
        </div>
      </div>
    </>
  )
}
