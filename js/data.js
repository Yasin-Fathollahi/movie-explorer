const API_READ_ACCESS_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzgyZGIyNzQzNDY4NWQ1MmZlNTVhYWNhZWVmNDI0ZSIsIm5iZiI6MTc4MjIzMjc1OC44MTc5OTk4LCJzdWIiOiI2YTNhYjZiNmY0NDZhOTBjODkwMTczMmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UD0U7d9fKskM7LT2U_SwPqOkxvJYTCw973-OxIAh3ro';
const BASE_URL = 'https://api.themoviedb.org/3/';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_READ_ACCESS_KEY}`,
  },
};

export async function searchMovieByTitle(title, page = 1) {
  const url = new URL('search/movie', BASE_URL);
  url.searchParams.set('query', title);
  url.searchParams.set('page', page);

  const res = await fetch(url, {
    ...options,
    signal: AbortSignal.timeout(5000),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.status_message);
  }

  return res.json();
}
