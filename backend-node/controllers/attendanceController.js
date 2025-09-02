import attendance from "../models/attendance.js";
import User from "../models/User.js";

export const takeAttendance = async (req, res) => {
  try {
    const Id = req.body.userId;
    const validStatus = req.body.Status;
    const user = await User.findById(Id);
    if (!user) {
      return res.status(404).send("user not found");
    }
    let presentCount = user.presentCount;
    let absentCount = user.absentCount;
    let presentCountM = user.presentCountMonth;
    let presentCountW = user.presentCountWeek;
    if (validStatus === "Present") {
      presentCount += 1;
      presentCountM += 1;
      presentCountW += 1;
    } else {
      absentCount += 1;
    }
    const attendanceRecord = new attendance({
      userId: user._id,
      status: validStatus,
    });
    await attendanceRecord.save();
    user.presentCount = presentCount;
    user.absentCount = absentCount;
    user.presentCountMonth = presentCountM;
    user.presentCountWeek = presentCountW;
    await user.save();
    res
      .status(201)
      .json({ message: "Attendance taken", attendance: attendanceRecord });
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const fetch24AttendanceLog = async (req, res) => {
  try {
    const users = await attendance
      .find()
      .populate("userId", "username role presentCountMonth");
    const now = new Date();
    const presentuser = users.filter((user) => {
      const date = new Date(user.date);
      return date.getDate() === now.getDate()&&user.status==="Present";
    });
    return res.status(200).json(presentuser);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const fetchWeekAttendanceLog = async (req, res) => {
  try {
    const id = req.params.userID;
    const last7Dates = await attendance
      .find({ userId: id })
      .sort({ date: -1 })
      .limit(7)
      .populate("userId", "username");

    if (!last7Dates || last7Dates.length === 0) {
      return res.status(404).send("No attendance records found");
    }
    return res.status(200).json(last7Dates);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const fetchTodayAttendanceID = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await attendance.find({ userId: userId });
    if(!user){
      return res.status(404).send("user not found")
    }
    const now = new Date();
    const todayAttendance = user.filter((user) => {
      const date = new Date(user.date);
      return date.getDate() === now.getDate()&&user.status==="Present";
    });
    return res.status(200).json(todayAttendance);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export const fetchTodayAbsent=async(req,res)=>{
  try {
    const users = await attendance
      .find().populate("userId", "username role absentCount ");
    const now = new Date();
    const absentuser = users.filter((user) => {
      const date = new Date(user.date);
      return date.getDate() === now.getDate()&&user.status==="Absent";
    });
    return res.status(200).json(absentuser);
  } catch (err) {
    return res.status(500).send(err);
  }
}