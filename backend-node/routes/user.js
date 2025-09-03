
import express from "express";
import { getAllStudent, getuserbyId } from "../controllers/userController.js";
import axios from "axios";
const router = express.Router();
router.get("/getAll", getAllStudent);
router.get("/:userID", getuserbyId)



export default router;
// module.exports = router;
