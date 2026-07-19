import { search } from '../services/tmdb.service.js';

export default async function searchController(req, res, next) {
  try {
    const { query, filter, page } = req.query;

    if (!query) {
      return res.status(400).json({
        status: 'fail',
        message: 'Search query is required',
      });
    }

    const data = await search(query, filter, page);
    res.status(200).json({ status: 'success', ...data });
  } catch (err) {
    next(err);
  }
}
