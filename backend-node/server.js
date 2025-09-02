// This is where everything begins, and we tell the app to start listening and using our DB + routes."

import authRouter from '../backend-node/routes/auth.js'
import userRouter from '../backend-node/routes/user.js'
import attendanceRouter from '../backend-node/routes/atten.js'
import express from "express";
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors'
import cron from "node-cron"
import User from './models/User.js';

dotenv.config();
connectDB();
cron.schedule("0 0 */30 * *", async () => {
  try {
    await User.updateMany({}, { $set: { presentCountMonth: 0 } });
  } catch (err) {
    console.error( err);
  }
});
cron.schedule("0 0 */168 * * *", async () => {  
  try {
    await User.updateMany({}, { $set: { presentCountWeek: 0 } });
  } catch (err) {
    console.error(err);
  }
});

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/user", userRouter);
app.use("/attendance", attendanceRouter)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
