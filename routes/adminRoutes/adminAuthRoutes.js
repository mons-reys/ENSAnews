const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');


//login
router.get('/login', authController.login);
router.post('/login', authController.logged);



//register
router.get('/register', authController.register);
router.post('/register', authController.user_create_post);

module.exports = router;