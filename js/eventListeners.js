import { search } from './data.js';
import { formImageURL } from './util.js';
import resultCard from './components/resultCard.js';
import error from './components/error.js';
import renderPerson from './views/renderPersonCard.js';
import renderMovieOrTV from './views/renderMovieOrTvCard.js';
import { routes } from './router.js';

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

  if ('gender' in result) {
    return 'person';
  }
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

function updateSearchUI(resultsLength, query) {
  const h2 = document.querySelector('h2');
  const resultsHeading = document.querySelector('.results-heading');
  const footer = document.querySelector('footer');
  const searchResults = document.querySelector('.search-results');
  const resultsList = document.querySelector('.results-list');
  const searchTitle = document.querySelector('.search-title');

  searchResults.classList.remove('hidden');
  footer.style.position = 'static';
  footer.style.color = '#000';
  resultsList.textContent = '';

  if (resultsLength === 0) {
    resultsHeading.classList.add('hidden');
    h2.textContent = 'No results found!';
    return;
  }

  if (h2.textContent === 'No results found!') {
    h2.innerHTML = 'Search results for "<span class="search-title"></span>"';
  }

  resultsHeading.classList.remove('hidden');
  searchTitle.textContent = query;
}

function renderSearchResults(query, results) {
  updateSearchUI(results.length, query);
  if (results.length === 0) return;

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

function renderPage(path) {
  const app = document.querySelector('#app');
  const view = (routes[path] || routes[404])();
  app.innerHTML = '';
  app.insertAdjacentHTML('afterbegin', view);
}

async function navigate(path = '/', props = null) {
  renderPage(path);

  if (path === '/') {
    setRandomBG();
  }

  if (path === '/search' && props) {
    const { query, filters, pushState } = props;

    // update the url
    if (pushState) {
      const newURL = new URL(`/search`, location.origin);
      newURL.searchParams.set('query', query);
      filters.forEach((filter) => newURL.searchParams.append('filter', filter));
      history.pushState(null, '', newURL);
    }

    const { results } = await search(query, filters, 1);
    renderSearchResults(query, results);
  }

  if (path === '/' || path === '/search') {
    addFormEventListeners();
  }
}

function addFormEventListeners() {
  const searchForm = document.querySelector('.search-form');

  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(searchForm);
    const query = formData.get('query');
    const filters = formData.getAll('filter');

    // render search page and search results
    await navigate('/search', { query, filters, pushState: true });
  });

  document.querySelector('.filter-btn').addEventListener('click', () => {
    const filtersDropdown = document.querySelector('.filters-dropdown');
    filtersDropdown.classList.toggle('active');
  });

  document.querySelectorAll('.toggle-filter-btn').forEach((button) =>
    button.addEventListener('click', (event) => {
      const btn = event.currentTarget;
      const checkbox = btn.querySelector('input');

      btn.classList.toggle('active');
      checkbox.toggleAttribute('checked');
    }),
  );
}

window.addEventListener('DOMContentLoaded', () => {
  if (location.pathname === '/search') {
    const params = new URLSearchParams(location.search);

    return navigate('/search', {
      query: params.get('query'),
      filters: params.getAll('filter'),
    });
  }

  navigate('/');
});

window.addEventListener('popstate', () => {
  const path = location.pathname;

  if (path === '/search') {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    const filters = params.getAll('filter');

    return navigate(path, { query, filters });
  }

  navigate(path);
});
