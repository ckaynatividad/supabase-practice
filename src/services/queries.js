import { checkError, client } from './client.js';
export async function getMovies() {
  const resp = await client.from('movies').select('*');
  return checkError(resp);
}

export async function getMoviesWithDirector() {
  const resp = await client.from('movies').select(`director_id, directors(name)`);
  return checkError(resp);
  // return the list of all the movies with their director
}

export async function getDirectorNames() {
  const resp = await client.from('directors').select('name');
  return checkError(resp);
  // return the list of the director's names
}

export async function getMovieById(id) {
  const resp = await client.from('movies').select('*').match({ id }).single();
  return checkError(resp);
  // return the movie with the given id
}

export async function getMovieByTitle(title) {
  const resp = await client.from('movies').select('*').match({ title }).single();
  return checkError(resp);
  // return the movie with the given title
}

export async function getOldestMovie() {
  const resp = await client.from('movies').select('*').gt('year', 8).limit(1).single();
  return checkError(resp);
  // return the oldest movie (assume the database is not sorted)
}

export async function getMoviesAfter(year) {
  const resp = await client.from('movies').select('*').gt('year', year);
  return checkError(resp);
  // return movies made after the year passed in
}

export async function getHighestGrossingMovie() {
  const resp = await client.from('movies').select('*').order('box_office', { ascending: false }).limit(1).single();
  return checkError(resp);
  // return movie with the highest box office total
}
