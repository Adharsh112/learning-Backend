import { Router } from "express";
import registerUser from "../controllers/user.controllers.js";
import {upload} from "../controllers/user.controllers.js"

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name : "avatar",
            maxCount : 1
        },
        {
            name : "co verImage",
            maxCount:1
        }
    ]),
    registerUser
    )

export default router;