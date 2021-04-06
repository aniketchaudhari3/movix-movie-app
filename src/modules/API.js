import axios from 'axios'

const OMDB_API_KEY = process.env.REACT_APP_MOVIE_API_KEY
const OMDB_ENDPOINT = `https://omdbapi.com`

let cancelToken;

export const getMovieById = (id) => {
  const url = `${OMDB_ENDPOINT}/?i=${id}&apiKey=${OMDB_API_KEY}`
  return axios.get(url)
}

export const searchMovieByTitle = (title) => {
  const url = `${OMDB_ENDPOINT}/?s=${title}&apiKey=${OMDB_API_KEY}`

  if (typeof cancelToken !== typeof undefined) {
    try {
      cancelToken.cancel()
    } catch (err) {
      console.log(`ERR: ${err.message}`)
    }
  }
  cancelToken = axios.CancelToken.source()
  return axios.get(url, {
    cancelToken: cancelToken.token
  })
}