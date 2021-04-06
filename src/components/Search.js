import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'
import SearchResult from './SearchResult'
import Searchbar from './Searchbar'
import Loader from './Loader'
import { searchMovieByTitle } from '../modules/API'

export default function Search() {
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const { query } = useParams()

  const fetchSearchResults = async () => {
    const res = await searchMovieByTitle(query)
    console.log(res)
    if (res?.data && res?.data?.Search.length > 0) {
      setSearchResults(res?.data?.Search)
      setLoading(false)
    } else if (res?.data?.Error) {
      setLoading(false)
      console.log(res.data.Error)
    }
  }

  useEffect(async () => {
    if (query) {
      setLoading(true)
      setSearchResults([])
      try {
        await fetchSearchResults()
      } catch (err) {
        if (!err.message) fetchSearchResults()
        console.log(err)
      }
    }
  }, [query])

  const getSearchText = () => searchResults.length === 0 ? `No results for "${query}"` : `Search results for "${query}"`

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <Searchbar value={query} />
        <div className="row justify-content-center">
          <div className="col-md-6 row remove-bs-gutter">
            <h4 className="text-center">
              {!loading && getSearchText()}
            </h4>
            {loading ? <div className="col-md-12 mx-auto mt-2 loader-container">
              <Loader size="large" />
            </div> : searchResults.length > 0 && searchResults.map((item, index) => {
              return <SearchResult data={item} key={index} />
            })}
          </div>
        </div>
      </div>
    </>
  )
}
