import { searchMovieByTitle } from './data.js';
const searchResults = document.querySelector('.search-results');
const searchForm = document.querySelector('.search-form');

function renderSearchResults(results) {
  results.forEach((result) =>
    searchResults.insertAdjacentHTML(
      'beforeend',
      `<li class="result-card">${result.title}</li>`,
    ),
  );
}

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(searchForm);
  const movieName = Object.fromEntries(formData.entries())['movie-name'];
  const { results } = await searchMovieByTitle(movieName, 1);
  renderSearchResults(results);
});
