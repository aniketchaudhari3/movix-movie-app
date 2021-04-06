import React, { useEffect } from 'react'
import { useAuth } from '../context/authContext'
import SearchResult from './SearchResult'
import Loader from './Loader'

export default function Wishlist() {
  const { currentUser, wishlist, getWishlistData, wishlistLoading } = useAuth()
  useEffect(() => {
    if (currentUser?.email) getWishlistData(currentUser?.email)
  }, [])
  return (
    <div className="mt-5">
      <h3 className="my-3">Your Favourite movies</h3>
      <div className="row">
        {wishlistLoading
          ? <div className="col-md-12 mx-auto mt-2 loader-container">
            <Loader size="large" />
          </div> :
          wishlist.length > 0 ? wishlist.map((item, index) => {
            return <SearchResult removeBtn={true} key={index} data={item} />
          })
            : wishlist.length === 0 && <h4 className="text-center mt-4">No movies added</h4>
        }
      </div>
    </div>
  )
}
