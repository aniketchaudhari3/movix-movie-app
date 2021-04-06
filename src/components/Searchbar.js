import React, { useState, useEffect } from 'react'
import { genres } from '../data/movieData'
import { searchMovieByTitle } from '../modules/API'
import { useHistory } from 'react-router-dom'

function Searchbar({ value }) {
  const [selectedGenre, setSelectedGenre] = useState('Action')
  const [suggestionSwitch, showSuggestions] = useState(false)
  const [autocomplete, setAutocomplete] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const history = useHistory()

  useEffect(() => {
    if (value) setSearchQuery(value)
  }, [])

  useEffect(() => {
    handleAutocomplete()
  }, [searchQuery])

  async function handleAutocomplete() {
    if (searchQuery.length > 0) {
      try {
        const res = await searchMovieByTitle(searchQuery)
        if (res?.data?.Search && res?.data?.Search.length > 0) {
          setAutocomplete(res?.data?.Search)
        }
      } catch (err) {
        console.log(err.message)
      }
    } else {
      setAutocomplete([])
    }
  }

  const parseTitle = (title) => {
    if (title.length > 15) return title.substring(0, 30) + '...'
    return title
  }

  return (
    <div className='row mb-2'>
      <div
        onSubmit={() => {
          return false
        }}
        className='d-flex justify-content-center'
      >
        <div className='col-md-6'>
          <div className='search-wrapper input-group my-3 '>
            <input
              id='search-bar'
              type='text'
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
              }}
              style={{ backgroundImage: "url('/images/search-image.png')" }}
              className='form-control'
              placeholder='Search movies'
              autoComplete="off"
              onFocus={() => showSuggestions(true)}
              onBlur={() => {
                setTimeout(() => {
                  showSuggestions(false)
                }, 200)
              }}
              onKeyPress={event => {
                if (
                  event.key === 'Enter' &&
                  searchQuery.length > 0
                ) {
                  history.push(`/search/${searchQuery}`)
                }
              }}
            />
            <button
              id='category-dropdown'
              className='btn dropdown-toggle'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              {selectedGenre}
            </button>
            <ul className='category-menu dropdown-menu dropdown-menu-end'>
              {genres.map((item, index) => (
                <li key={index} onClick={() => setSelectedGenre(item)}>
                  <a className='p-2 dropdown-item'>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* auto complete box */}
          <div className="input-group">
            <ul className={`category-menu dropdown-menu ${suggestionSwitch ? 'show' : ''} search-suggestions w-100`}>
              {autocomplete.length > 0 && autocomplete.map((item, index) => {
                return (
                  <li key={index}
                    className="d-flex justify-content-between"
                    onClick={() => {
                      history.push({ pathname: `/movie/${item?.imdbID}` })
                    }}
                  >
                    <a className='p-2 dropdown-item'>
                      {parseTitle(item.Title)}
                      <span className='float-end mx-2 badge rounded-pill bg-light text-dark'>
                        {item.Year}
                      </span>
                    </a>
                  </li>
                )
              })}
              {autocomplete.length === 0 && <li className="p-2 dropdown-item"></li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Searchbar
