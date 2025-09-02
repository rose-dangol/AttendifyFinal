import express from "express";
import axios from "axios";
import { fetch24AttendanceLog, fetchTodayAbsent, fetchTodayAttendanceID, fetchWeekAttendanceLog, takeAttendance } from "../controllers/attendanceController.js";

const router = express.Router();
router.post("/takeAttendance", takeAttendance);
router.get("/getTodayUser",fetch24AttendanceLog);
router.get("/last7days/:userID", fetchWeekAttendanceLog);
router.get("/todayAttendance/:userId", fetchTodayAttendanceID);
router.get("/absentAttendance", fetchTodayAbsent)

export default router;
// module.exports = router;
