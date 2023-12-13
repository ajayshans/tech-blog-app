const router = require('express').Router();
// Import Post model
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// TODO: Add post routes