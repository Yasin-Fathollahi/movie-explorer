import resultCard from '../components/resultCard.js';
import { formImageURL } from '../util.js';

const searchResultsList = document.querySelector('.results-list');
const jobs = {
  Acting: 'Actor',
  Directing: 'Director',
  Production: 'Producer',
};

export default function renderPerson(person) {
  const profile = person.profile_path
    ? formImageURL(person.profile_path, 'poster', 'mobile')
    : '/public/images/person-fallback.webp';

  const knownFor = person.known_for.reduce((mostPopularWork, currentWork) =>
    mostPopularWork.popularity < currentWork.popularity
      ? currentWork
      : mostPopularWork,
  );

  const personDTO = {
    name: person.name,
    profile,
    knownFor,
    job: jobs[person.known_for_department],
    type: 'person',
  };

  searchResultsList.insertAdjacentHTML('beforeend', resultCard(personDTO));
}
