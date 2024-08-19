import mongoose from "mongoose";
const quizSchema = new mongoose.Schema(
  {
    id: String,
    quiz: Array,
  },
  { _id: false }
);
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    email: String,
    lastName: String,
    dob: Date,
    role: {
      type: String,
      enum: ["STUDENT", "FACULTY", "ADMIN", "USER"],
      default: "USER",
    },
    loginId: String,
    section: String,
    lastActivity: Date,
    totalActivity: String,
    courses: Array,
    quizes: [quizSchema],
  },
  { collection: "users" }
);
export default userSchema;