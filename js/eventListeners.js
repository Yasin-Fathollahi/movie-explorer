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
  event.preventDefault();
  const formData = new FormData(searchForm);
  const movieName = Object.fromEntries(formData.entries())['movie-name'];
  const { results } = await searchMovieByTitle(movieName, 1);

  const searchTitle = (document.querySelector('.search-title').textContent =
    movieName);

  console.log(results);

  renderSearchResults(results);
});
