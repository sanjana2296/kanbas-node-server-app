import mongoose from "mongoose";
const coursesSchema = new mongoose.Schema(
  {
    cid :{type: String, unique: true },
    number: { type: String, required: true },
    name: String,
    startDate: String,
    endDate: String,
    department: String,
    credits: Number,
    description: String,
  },
  { collection: "courses" }
);

export default coursesSchema;
