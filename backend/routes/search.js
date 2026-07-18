import express from 'express';
import searchController from '../controllers/search.controller.js';

export default express.Router().get('/api/search', searchController);
