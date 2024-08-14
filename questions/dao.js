import model from "./model.js";

export const createQuestion = (question) => {
  return model.create(question);
};

export const findQuestionById = (questionId) => model.findById(questionId);

export const findQuestionByIdAndQuizId = (quizId, questionId) =>
  model.findOne({ quizId, _id: questionId });

export const findAllQuestions = () => model.find();
export const findQuestionsByQuizId = (quizId) => model.findOne({ quizId });

export const findAllQuestionInQuiz = (quizId) => model.find({ quizId });

export const updateQuestions = (questionId, questions) =>
  model.findByIdAndUpdate(questionId, {
    $set: {
      ...questions,
    },
  });

export const deleteQuestionByQuizIdAndQuestionId = (quizId, questionId) =>
  model.deleteOne({ quizId, _id: questionId });
export const deleteQuestions = (questionId) =>
  model.deleteOne({ _id: questionId });
