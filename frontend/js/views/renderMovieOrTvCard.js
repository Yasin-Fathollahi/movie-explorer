import resultCard from '../components/resultCard.js';
import { formImageURL } from '../util.js';

export default function renderMovieOrTV(result, type) {
  const searchResultsList = document.querySelector('.results-list');
  const poster = result.poster_path
    ? formImageURL(result.poster_path, 'poster', 'mobile')
    : '/public/images/video-fallback.webp';
  const year = new Date(
    result.release_date || result.first_air_date,
  ).getFullYear();

  // TODO: also try the new Temporal API

  const resultDTO = {
    title: result.title || result.name,
    poster,
    voteAverage: result.vote_average,
    voteCount: result.vote_count,
    year,
    type,
  };

  searchResultsList.insertAdjacentHTML('beforeend', resultCard(resultDTO));
}
