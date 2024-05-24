import { Router } from "express";
import moment from "moment";
import multer from "multer";

import { login, register } from "../controller/authController.js";
import { fromData } from "../configuration/config.js";
const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, resolve("./src/assets/images/"));
  },
  filename: (req, file, cb) => {
    let { fullName } = req.body;
    fullName = fullName.replace(/\s+/g, "");
    const ext = extname(file.originalname);
    const timestamp = moment().format("DD_MMM_YY--h-mm");
    const filename = `${timestamp}-${fullName}${ext}`;
    cb(null, filename);
  },
});

const upload_single = multer({ storage }).single("profile_image");

router.post("/login", fromData, login);
router.post("/register", fromData, register);

export default router;
