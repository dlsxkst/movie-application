//import axios module
const axios = require('axios')
const lodash = require('lodash')
const movieList = require('../data/movies.json').movies;

const BASE_URL = 'http://localhost:3000/movies'

//After starting the JSOn server check the port on which is running accordingly change 
//the port in url given below

//This method will get all movies from json server
const getMovies = async (done) => {
  // This url can be used - axios.get("http://localhost:3000/movies")
  const response = await axios.get(`${BASE_URL}`)

  done(null, JSON.stringify(response.data))

  return response.data;
}

//This method will get specific movie id from json server
const getMovieById = async (movieId, done) => {
  // This url can be used- axios.get(`http://localhost:3000/movies/${movieId}`)
  const movie = lodash.find(movieList, { id:parseInt(movieId) })

  if(movie){
    const response = await axios.get(`${BASE_URL}/${movieId}`);

    done(null, JSON.stringify(response.data));

    return response.data;
  }
}
//This method will save Movie details in Json server
const saveMovieDetails = async (movieDetails, done) => {
  //This url can be used  -  axios.post(`http://localhost:3000/movies`, movieDetails)
  const movie = lodash.find(movieList, { id: movieDetails.id });

  if(movie){
    done('Movie already exist..')

    return 'There is the same movie id!'
  } else {
    const response = await axios.post(`${BASE_URL}`, movieDetails);

    done(null, JSON.stringify(response.data));

    return {
      success: true,
      message: "Movie added successfully"
    }
  }
}

//This method will update MovieDetails in Json Server
const updateMovieDetails = async (movieId, movieDetails, done) => {
  //This url can be used - axios.patch(`http://localhost:3000/movies/${movieId}`, movieDetails)
  const movie = lodash.find(movieList, { id: parseInt(movieId) });

  if(movie){
    const response = await axios.put(`${BASE_URL}/${movieId}`, movieDetails
    )
    done(null, JSON.stringify(response.data));
    return response.data;
  } else {
    done(null, `Movie data with id ${movieId} not found`);

    return `Movie data with id ${movieId} not found`
  }
}

//This method will delete specific movie from Json Server
const deleteMovieById = async (movieId, done) => {
  //This url can be used -  axios.delete(`http://localhost:3000/movies/${movieId}`)
  const movie = lodash.find(movieList, { id: parseInt(movieId) });

  if(movie){
    const response = await axios.delete(`${BASE_URL}/${movieId}`);

    done(null, JSON.stringify(response.data));

    return {
      success: true,
      message: "Movie deleted successfully"
    }
  }
}

module.exports = {
  getMovies,
  getMovieById,
  saveMovieDetails,
  deleteMovieById,
  updateMovieDetails
}