import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { Toast } from './Toast'
import {  FaRegBookmark } from 'react-icons/fa'

export default function SearchResult({ data, removeBtn }) {
  const { currentUser, wishlist, removeMovieFromWishlist } = useAuth()

  async function handleRemove(docId) {
    const idToDelete = wishlist.filter(el => el.id === docId)[0]
    if (idToDelete && currentUser?.email) {
      await removeMovieFromWishlist(idToDelete.id)
      Toast.fire({
        title: 'Movie removed from wishlist',
        icon: 'success'
      })
    }
  }
  return (

    <div className="card search-result-card d-flex">
      <div className="card-body row">
        <div className="col-md-3">
          <Link to={`/movie/${data?.imdbID}`}>
            <img className="search-result-image" src={data?.Poster} />
          </Link>
        </div>
        <div className="col-md-9 d-flex flex-column">
          <Link to={`/movie/${data?.imdbID}`}>
            <h3 className="card-title mb-2">{data?.Title}</h3>
            <h4 className="card-subtitle mb-2 text-muted">{data?.Year}</h4>
          </Link>
          {removeBtn && <button onClick={() => handleRemove(data?.id)} className="btn btn-danger w-50 mt-2"><FaRegBookmark /> Remove from Wishlist</button>}
        </div>
      </div>
    </div>
  )
}