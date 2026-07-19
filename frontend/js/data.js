import { API_BASE_URL } from './config';

export async function search(query, filters, page = 1) {
  const url = new URL('api/search', API_BASE_URL);
  url.searchParams.set('query', query);
  filters.forEach((filter) => url.searchParams.append('filter', filter));
  url.searchParams.set('page', page);

  const res = await fetch(url);
  return res.json();
}
