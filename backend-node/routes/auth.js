// ROUTING HAPPENS HERE
// "When someone goes to /login, send them to the correct function in authController.js."

import express from "express";
import {login, register, addNewUser, getUserById} from '../controllers/authController.js'

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/addNewUser", addNewUser) 
router.get("/getUserById", getUserById);

export default router;
// module.exports = router;
