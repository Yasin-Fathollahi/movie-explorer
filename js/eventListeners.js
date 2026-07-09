import { search } from './data.js';
import { formImageURL } from './util.js';
import resultCard from './components/resultCard.js';
import error from './components/error.js';
import renderPerson from './views/renderPersonCard.js';
import renderMovieOrTV from './views/renderMovieOrTvCard.js';
const searchForm = document.querySelector('.search-form');
const resultsSection = document.querySelector('.search-results');
const searchResultsList = document.querySelector('.results-list');
const footer = document.querySelector('footer');
const filterBtn = document.querySelector('.filter-btn');
const toggleFilterBtn = document.querySelectorAll('.toggle-filter-btn');

function determineResultType(result) {
  if (result.media_type) {
    return result.media_type;
  }
  if (result.release_date) {
    return 'movie';
  }

  if (result.first_air_date) {
    return 'tv';
  }

  if (result.gender) {
    return 'person';
  }
}

function renderSearchResults(query = 'test movie', results) {
  const h2 = document.querySelector('h2');
  const resultsHeading = document.querySelector('.results-heading');

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
  document.querySelector('.search-title').textContent = query;

  results.forEach((result) => {
    const type = determineResultType(result);

    if (type === 'movie' || type === 'tv') {
      renderMovieOrTV(result, type);
    }

    if (type === 'person') {
      renderPerson(result);
    }
  });
}

function renderError(targetContainer, message) {
  // Not working yet
  targetContainer.insertAdjacentHTML('afterbegin', error(message));
}

function setRandomBG() {
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
}

function createUpdatedURL(query, filters) {
  const url = new URL(window.location);
  url.search = '';
  url.searchParams.set('query', query);
  filters.forEach((filter) => url.searchParams.append('filter', filter));
  return url;
}

async function handleSearch() {
  try {
    document.querySelector('.search-input').value = '';
    const { query, results } = await search(1);
    renderSearchResults(query, results);
  } catch (err) {
    console.error(err);
    window.location.replace('/');
  }
}

async function handleSearchSubmit(event) {
  event.preventDefault();
  const formData = new FormData(searchForm);
  const query = formData.get('query');
  const filters = formData.getAll('filter');

  const updatedURL = createUpdatedURL(query, filters);
  const isSameSearch = location.search === updatedURL.search;

  if (isSameSearch) {
    // prevent redundant pushState and api call
    return;
  }

  // change the url without reload
  history.pushState({}, '', updatedURL);

  const { results } = await search(1);
  renderSearchResults(query, results);
}

function toggleFilterList() {
  const filtersDropdown = document.querySelector('.filters-dropdown');
  filtersDropdown.classList.toggle('active');
}

function toggleFilter(event) {
  const btn = event.currentTarget;
  const checkbox = btn.querySelector('input');

  btn.classList.toggle('active');
  checkbox.toggleAttribute('checked');
}

window.addEventListener('DOMContentLoaded', () => {
  if (location.pathname === '/') return setRandomBG();
  if (location.pathname === '/search.html') return handleSearch();
});

location.pathname === '/search.html' &&
  searchForm.addEventListener('submit', handleSearchSubmit);

// event.state => a copy of the state
window.addEventListener('popstate', handleSearch);

filterBtn && filterBtn.addEventListener('click', toggleFilterList);

toggleFilterBtn.forEach((button) =>
  button.addEventListener('click', toggleFilter),
);
