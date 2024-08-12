import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
  {
    _id : {type : String , unique: true },
    title: String,
    course: String,
    description :String,
    points : Number,
    dueDate : String,
    availableFrom : String
  },
  { collection: "assignments" }
);

export default assignmentSchema;
