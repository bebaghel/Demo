import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    updateAccountDetails,
    getCurrentUser,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory,
} from "../controllers/user.controller.mjs";
import { ping } from '../controllers/user.controller.mjs'
import { Router } from "express";
import verifyJWT from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'

const router = Router()

router.route('/register').post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]), registerUser);

    
    
    router.route('/login').post(verifyJWT, loginUser)
    
    // secure routes
    router.route('/logout').post(verifyJWT, logoutUser)
    
    router.get('/ping', ping)
router.route('/refresh_token').post(refreshAccessToken)

router.route('/change-password').post(verifyJWT, changeCurrentPassword)

router.route('/current-user').get(verifyJWT, getCurrentUser)

router.route('/update-account').patch(verifyJWT, updateAccountDetails)

router.route('/avatar').patch(verifyJWT, upload.single("avatar"), updateUserAvatar)

router.route('/cover-image').patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

router.route('/c/:username').get(verifyJWT, getUserChannelProfile)
router.route('/history').get(verifyJWT, getWatchHistory)


export default router;







