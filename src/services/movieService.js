import http from "./httpService";
import apiUrl from "../config";

const apiEndPoint = apiUrl.apiUrl + "/movies";

export function getMovies() {
  return http.get(apiEndPoint);
}

export function getMovie(movieId) {
  return http.get(apiEndPoint + "/" + movieId);
}

export function saveMovie(movie) {
  if (movie.id) {
    const body = { ...movie };
    delete body.id;
    return http.put(apiEndPoint + "/" + movie.id, body);
  }

  return http.post(apiEndPoint, movie);
}

export function deleteMovie(movieId) {
  return http.delete(apiEndPoint + "/" + movieId);
}
