import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Navbar from './Navbar'
import Loader from './Loader'
import { getMovieById } from '../modules/API'
import { Toast } from './Toast'
import { useAuth } from '../context/authContext'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { MdMovie } from 'react-icons/md'

export default function MovieDetails() {
  const [movieData, setMovieData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const history = useHistory()
  const { movieId } = useParams()

  const { currentUser, addMovieToWishlist, removeMovieFromWishlist, wishlist, wishlistLoading } = useAuth()

  const fetchMovieData = async () => {
    const res = await getMovieById(movieId)
    console.log(res)
    if (res?.data && !res?.data?.Error) {
      setMovieData(res?.data)
      setLoading(false)
    } else if (res?.data?.Error) {
      setLoading(false)
      setError(true)
      console.log(res.data.Error)
    }
  }

  useEffect(async () => {
    console.log(movieId)
    if (movieId !== undefined) {
      setLoading(true)
      setMovieData(null)
      try {
        await fetchMovieData()
      } catch (err) {
        if (!err.message) fetchMovieData()
        setError(true)
        console.log(err)
      }
    } else {
      history.push('/')
    }
  }, [movieId])

  const addMovie = async (data) => {
    if (currentUser?.email) {
      const insertData = { email: currentUser?.email, ...data }
      await addMovieToWishlist(insertData)
      Toast.fire({
        title: 'Movie added to wishlist',
        icon: 'success'
      })
    } else {
      Toast.fire({
        title: "Please login to add movie to wishlist",
        icon: 'info'
      })
    }
  }

  const removeMovie = async (id) => {
    if (currentUser?.email) {
      await removeMovieFromWishlist(id)
      Toast.fire({
        title: 'Movie removed from wishlist',
        icon: 'success'
      })
    }
  }

  const findObject = () => wishlist.filter(movie => movie.imdbID === movieId)[0]

  function movieExistsInWishlist() {
    if (findObject(wishlist)) {
      return true
    }
    return false
  }

  function handleAdd() {
    addMovie({ imdbID: movieData?.imdbID, Title: movieData?.Title, Poster: movieData?.Poster })
  }

  function handleRemove() {
    const idToDelete = findObject(wishlist, (movie) => movie.imdbID === movieId)
    if (idToDelete) {
      removeMovie(idToDelete.id)
    }
  }
  function Error() {
    return (
      <div className="container-fluid  mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4 remove-bs-gutter row justify-content-center">
                <img className="error-image" src="/images/no-result.png"  />
              </div>
        </div>
        <h4 className="text-center mt-5"> Oops! Movie not found</h4>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="container row">
          {loading ?
            <div className="col-md-12 mx-auto mt-2 loader-container">
              <Loader size="large" />
            </div>
            : error ? <Error /> : <div className="col-md-7 mx-auto row mt-5">
              <div className="col-md-4 remove-bs-gutter row justify-content-center">
                <img className="movie-image rounded" src={movieData?.Poster} />
              </div>
              <div className="col-md-8 px-md-5 px-sm-2 py-4">
                <div>
                  <h1 className="movie-details-text">{movieData?.Title}</h1>
                  <p className="movie-details-text">{movieData?.Rated} | {movieData?.Runtime} | {movieData?.Type?.toUpperCase()} | {movieData?.Year}</p>
                  <p className="text-muted">⭐ {movieData?.imdbRating}</p>

                  {movieData?.Genre && movieData?.Genre.split(',').length > 0
                    ? movieData?.Genre.split(',').map((genre) => {
                      return (<span className='mx-1 badge rounded-pill bg-dark text-light'>{genre}</span>)
                    })
                    : <span className='mx-2 badge rounded-pill bg-dark text-light'>{movieData?.Genre}</span>
                  }

                  {movieData?.Language && movieData?.Language.split(',').length > 0
                    ? movieData?.Language.split(',').map((language) => {
                      return (<span className='mx-1 mt-2 badge rounded-pill bg-warning text-dark'>{language}</span>)
                    })
                    : <span className='mx-2 badge rounded-pill bg-warning text-dark'>{movieData?.Langauge}</span>
                  }

                  <div class="d-grid gap-2 mt-3">
                    <button onClick={() => {
                      if (movieExistsInWishlist()) {
                        handleRemove()
                      } else {
                        handleAdd()
                      }
                    }}
                      className={`btn btn-${movieExistsInWishlist() ? 'danger' : 'primary'}`}
                      type="button">
                      {
                        wishlistLoading ? <Loader /> :
                          movieExistsInWishlist() ?
                            <span><FaRegBookmark />   Remove from Wishlist</span>
                            : <span><FaBookmark />   Add to Wishlist</span>
                      }
                    </button>
                  </div>
                  <br />
                  <p className="mt-2">
                    <h5>About this {movieData?.Type}</h5>
                    {movieData?.Plot}
                  </p>
                  <p className="mt-3 text-muted">
                    Cast: {movieData?.Actors}
                  </p>
                </div>
              </div>
            </div>}
        </div>
      </div>
    </>
  )
}
