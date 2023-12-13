const router = require('express').Router();
// Import Comment model
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// TODO: Add comment routes

// POST (/) - request to create a new comment

// DELETE (/:id) - request to delete an existing comment by id (id in comment table)