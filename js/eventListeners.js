import { searchMovieByTitle } from './data.js';
import { formImageURL } from './util.js';
import resultCard from './components/resultCard.js';
const searchResultsList = document.querySelector('.results-list');
const searchForm = document.querySelector('.search-form');

function renderSearchResults(results) {
  searchResultsList.textContent = '';
  results.forEach((result) => {
    const poster = formImageURL(result.poster_path, 'poster', 'mobile');
    const year = new Date(result.release_date).getFullYear();

    // TODO: also try the new Temporal API

    const movie = {
      title: result.title,
      poster,
      year,
      voteAverage: result.vote_average,
      voteCount: result.vote_count,
    };

    searchResultsList.insertAdjacentHTML('beforeend', resultCard(movie));
  });
}

window.addEventListener('load', () => {});

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(searchForm);
  const movieName = Object.fromEntries(formData.entries())['movie-name'];
  const { results } = await searchMovieByTitle(movieName, 1);

  const searchTitle = (document.querySelector('.search-title').textContent =
    movieName);

  console.log(results);

  renderSearchResults(results);
});
