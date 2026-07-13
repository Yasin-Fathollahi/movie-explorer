import home from './pages/home.js';
import search from './pages/search.js';

export const routes = {
  '/': home,
  '/search': search,
  404: () => '<p style="color:red;">404 not found<p>',
};
