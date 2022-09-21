const router = require('express').Router();
const { regestrationUser, loginUser, selectProfile,updateProfile, profileDetails} = require ('../controller/UserController');
const {TokenVerify} = require('../middleware/VerifyMiddleware')
const {AdminVerify}= require('../middleware/AdminAuth')

router.route('/regestrationUser')
    .post(regestrationUser)

router.route('/loginUser')
    .post(loginUser)

router.get('/selectProfile', [TokenVerify, AdminVerify], selectProfile)
router.post('/updateProfile', TokenVerify, updateProfile)
router.get('/profileDetails', TokenVerify, profileDetails)
    
module.exports = router;
