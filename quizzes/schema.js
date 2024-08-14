import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    points: { type: Number, required: true },
    type: String,
    group: String,
    isShuffleAnswers: { type: String, required: true },
    timeLimit: String,
    isMultipleAttempts: { type: String },
    isShowCorrectAnswers: { type: String, required: true },
    accessCode: String,
    oneQuestionAtATime: String,
    isWebCamRequired: String,
    isLockQuestionsAfterAnswered: String,
    due: { type: Date, required: true },
    available: { type: Date, required: true },
    until: { type: Date, required: true },
    course: String,
    isPublished: { type: Boolean, default: false },
    noOfQuestions: { type: Number, required: true },
  },
  { collection: "quizzes" }
);

export default quizSchema;
