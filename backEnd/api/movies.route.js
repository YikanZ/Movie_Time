import express from 'express';
import MoviesController from './movies.controller.js';
import ReviewsController from './reviews.controller.js';
import FavoriteController from "./favorites.controller.js";

const router = express.Router();  // Get access to Express router

router.route('/').get(MoviesController.apiGetMovies);  // Get all movies
router.route('/id/:id').get(MoviesController.apiGetMovieById);  // Get movie by id
router.route('/ratings').get(MoviesController.apiGetRatings);  // Get movie ratings

router.route('/review').post(ReviewsController.apiPostReview);  // Post a review
router.route('/review/:id').put(ReviewsController.apiUpdateReview);  // Update a review
router.route('/review/:id').delete(ReviewsController.apiDeleteReview);  // Delete a review




router
    .route("/favorites")
    .put(FavoriteController.apiUpdateFavorites);

router
    .route("/favorites/:userId")
    .get(FavoriteController.apiGetFavorites);

router
    .route("/:userId/favorites")
    .get(FavoriteController.apiGetMyFavorites);
export default router;  // Export router
