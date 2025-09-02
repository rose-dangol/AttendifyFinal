// attendance.model.js
import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // references User collection
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  
  checkInTime: {
    type: Date,
  },
  checkOutTime: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["Present", "Absent"],
    default: "Present",
  },
  markedBy: {
    type: String,
    enum: ["System", "Admin", "Manual"],
    default: "System",
  }
}, { timestamps: true });

export default mongoose.model("Attendance", attendanceSchema);