import mongoose from "mongoose";
import * as dao from "./dao.js";
import * as quizDao from "../quizzes/dao.js";

export default function QuestionsRoutes(app) {
  const deleteQuestion = async (req, res) => {
    try {
      const { qid, questionId } = req.params;

      const question = await dao.findQuestionById(questionId);

      const questionPoints = question.points;

      const quiz = await quizDao.findQuizById(qid);

      const finalPoints = quiz.points - questionPoints;

      await quizDao.updateQuiz(qid, { points: finalPoints });

      const status = await dao.deleteQuestionByQuizIdAndQuestionId(
        qid,
        questionId
      );

      res.json({ status });
    } catch (error) {
      console.log(error);
      res.status(404).send("Quiz not deleted! Try again!");
    }
  };

  const updateQuestion = async (req, res) => {
    const { questionId, qid } = req.params;

    const quiz = await quizDao.findQuizById(qid);

    const question = await dao.findQuestionById(questionId);

    const points = quiz.points - question.points;

    delete req.body._id;
    delete req.body.quizId;

    const finalPoints = points + req.body.points;

    await quizDao.updateQuiz(qid, { points: finalPoints });

    await dao.updateQuestions(questionId, req.body);
    res.sendStatus(204);
  };

  const getAllQuizzes = async (req, res) => {
    const quizzes = await dao.findAllQuestions();
    res.json(quizzes);
  };

  const getQuestionsByQuizId = async (req, res) => {
    const { qid } = req.params;
    const questions = await dao.findAllQuestionInQuiz(qid);
    if (!questions) {
      res.status(404).json([]);
      return;
    }
    res.json(questions);
  };

  const createQuestionForQuiz = async (req, res) => {
    try {
      const { qid } = req.params;
      const question = await dao.createQuestion({
        ...req.body,
        quizId: qid,
        _id: new mongoose.Types.ObjectId(),
      });

      const quizPoints = req.body.points;
      const quiz = await quizDao.findQuizById(qid);

      const finalPoints = quiz.points + quizPoints;

      await quizDao.updateQuiz(qid, { points: finalPoints });

      res.json(question);
    } catch (error) {
      console.log(error);
      res.status(404).send("Quiz not created! Try again!");
    }
  };

  const getQuestion = async (req, res) => {
    const { qid, questionId } = req.params;
    const question = await dao.findQuestionByIdAndQuizId(qid, questionId);
    if (!question) {
      res.status(404).json(question);
      return;
    }
    res.json(question);
  };

  app.get("/api/quizzes/:qid/question", getQuestionsByQuizId);
  app.get("/api/quizzes/:qid/:questionId", getQuestion);
  app.delete("/api/quizzes/:qid/:questionId", deleteQuestion);
  app.put("/api/quizzes/:qid/:questionId", updateQuestion);
  app.post("/api/courses/:cid/quizzes/:qid/question", createQuestionForQuiz);
}
