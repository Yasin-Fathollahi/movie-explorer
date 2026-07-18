const BASE_URL = 'https://api.themoviedb.org/3/';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_KEY}`,
  },
};

/*
search/multi  // GET
Use multi search when you want to search for movies, TV shows and people in a single request.

search/tv // GET
Search for TV shows by their original, translated and also known as names.

https://api.themoviedb.org/3/trending/person/{time_window} // GET
Get the trending people on TMDB.
*/

function filterResults(results, includedTypes) {
  return results.filter((res) => includedTypes.includes(res.media_type));
}

export async function search(
  query,
  filters = ['movie', 'tv', 'person'],
  page = 1,
) {
  const route = filters.length > 1 ? 'search/multi' : `search/${filters[0]}`;
  const url = new URL(route, BASE_URL);
  url.searchParams.set('query', query);
  url.searchParams.set('page', page);

  const res = await fetch(url, {
    ...options,
    signal: AbortSignal.timeout(5000),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.status_message || 'Something went wrong!');
  }

  const data = await res.json();
  const reformattedData = {
    page: page,
    results: data.results,
    totalResults: data.total_results,
    totalPages: data.total_pages,
  };

  if (route === 'search/multi' && filters.length < 3) {
    const filteredResults = filterResults(reformattedData.results, filters);
    const RESULTS_PER_PAGE = 20;
    return {
      page,
      results: filteredResults,
      totalResults: filteredResults.length,
      totalPages: filteredResults.length / RESULTS_PER_PAGE,
    };
  }

  return data;
}
