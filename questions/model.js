import mongoose from "mongoose";
import questionsSchema from "./schema.js";

const model = new mongoose.model("QuestionsSchema", questionsSchema);

export default model;
