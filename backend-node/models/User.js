import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  presentCount:{
    type: Number,
    default: 0,
  },
   absentCount:{
    type: Number,
    default: 0,
  },
  presentCountMonth:{
    type: Number,
    default:0
  },
   presentCountWeek:{
    type: Number,
    default:0
  },
  role: { type: String, enum: ["student", "admin"], default: "student" }
},
{timestamps: true }
);

export default mongoose.model("User", userSchema);
