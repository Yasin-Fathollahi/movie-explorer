import { search } from '../services/tmdb.service.js';

export default async function searchController(req, res, next) {
  const { query, filter, page } = req.query;

  try {
    const data = await search(query, filter, page);

    res.status(200).json({ status: 'success', ...data });
  } catch (err) {
    console.error(err);
    next(err);
  }
}
