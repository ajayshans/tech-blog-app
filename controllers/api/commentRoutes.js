const router = require('express').Router();
// Import Comment model
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// TODO: Add comment routes