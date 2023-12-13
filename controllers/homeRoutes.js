const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// TODO: Add homeroutes
// GET all projects and join with user data (/)

// GET specific project and join with user data (/project/:id)

// Use withAuth middleware to prevent access to route (/profile)

// If user is already logged in, redirect request to another route GET (/login)