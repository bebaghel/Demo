import verifyJWT from "../middlewares/auth.middleware"

import { upload } from "../middlewares/multer.middleware";
import { Router } from "express";


const router = Router();


router.use(verifyJWT);


router.route('/').get(getAllVideos)
    .post(upload.fields(
        [
            {
                name: "videoFile",
                maxCount: 1,
            },
            {
                name: "thumbnail",
                maxCount: 1
            }
        ]
    ),
        publishAVideo
    );

router.route('/:videoId')
    .get(getVideoId)
    .delete(deleteVideo)
    .patch(upload.single('thumbnail'), updateVideo);

router.route("/toggle/publish/:videoId")
    .patch(togglePublisStatus)

export default router;