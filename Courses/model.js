import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("CoursesSchema", schema);
export default model;