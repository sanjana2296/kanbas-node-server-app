import mongoose from "mongoose";
import schema from "./schema.js";

const model = new mongoose.model("QuizSchema", schema);

export default model;
