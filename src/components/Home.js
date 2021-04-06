import React, { useEffect } from 'react'
import Navbar from './Navbar'
import MovieCard from './MovieCard'
import Searchbar from './Searchbar'
import popularMovies from '../data/popularMovies'

export default function Home() {

  return (
    <div className="home-container">
      <Navbar />
      <div className="container-fluid">
        <Searchbar />
      </div>
      <div className="container-fluid">
        <div className="row justify-content-center remove-bs-gutter">
          <h4 className="col-md-11 col-sm-12 popular-movies-title">Popular Movies</h4>
          <div className="col-md-11 col-sm-12 row remove-bs-gutter">
            {popularMovies.length > 0 && popularMovies.map((item, index) => <MovieCard key={index + 'ID'} data={item} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
