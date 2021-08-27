const router = require('express').Router();
const {
    login,
    register,
    allUser,
    singleUser
} = require('../controllers/userController');

router.post('/login', login);
router.post('/register', register);
router.get('/', allUser);
router.post('/:id', singleUser);


module.exports = router;