const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/users', UserController.createUser);
router.post('/login', UserController.getUser);
router.get('/user/:id', UserController.getUserProfile); // Route to get user profile
router.put('/user/:id', UserController.updateUserProfile); // Route to update user profile

module.exports = router;
