import { searchMovieByTitle } from './data.js';
import { formImageURL } from './util.js';
import resultCard from './components/resultCard.js';
import error from './components/error.js';
const searchForm = document.querySelector('.search-form');
const resultsSection = document.querySelector('.search-results');
const searchResultsList = document.querySelector('.results-list');
const footer = document.querySelector('footer');

function renderSearchResults(results) {
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

function renderError(targetContainer, message) {
  // Not working yet
  targetContainer.insertAdjacentHTML('afterbegin', error(message));
}

window.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  const backgrounds = [
    './public/images/bg-0.webp',
    './public/images/bg-1.webp',
    './public/images/bg-2.webp',
    './public/images/bg-3.webp',
  ];

  const randomImage =
    backgrounds[Math.floor(Math.random() * backgrounds.length)];

  hero.style.backgroundImage = `url('${randomImage}')`;
});

searchForm.addEventListener('submit', async (event) => {
  const h2 = document.querySelector('h2');
  const resultsHeading = document.querySelector('.results-heading');
  event.preventDefault();
  const formData = new FormData(searchForm);
  const movieName = Object.fromEntries(formData.entries())['movie-name'];
  const { results } = await searchMovieByTitle(movieName, 1);

  resultsSection.classList.remove('hidden');
  footer.style.position = 'static';
  footer.style.color = '#000';
  searchResultsList.textContent = '';

  if (results.length === 0) {
    resultsHeading.classList.add('hidden');
    h2.textContent = 'No results found!';
    return;
  }

  if (h2.textContent === 'No results found!') {
    h2.innerHTML = 'Search results for "<span class="search-title"></span>"';
  }

  resultsHeading.classList.remove('hidden');
  document.querySelector('.search-title').textContent = movieName;

  renderSearchResults(results);
});
