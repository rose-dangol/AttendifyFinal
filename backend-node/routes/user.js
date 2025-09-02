
import express from "express";
import { getAllStudent } from "../controllers/userController.js";
import axios from "axios";
const router = express.Router();
router.get("/getAll", getAllStudent);



export default router;
// module.exports = router;
