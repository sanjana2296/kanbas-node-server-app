import model from "./model.js";


export const createUser = (user) => {
  delete user._id;
  return model.create(user);
};
export const findAllUsers = () => model.find();

export const enrollUserInCourse = async (userId, cid) => {
  try {
    const user = await findUserById(userId);
    
    if (user) {
      const updatedUser = await model.findOneAndUpdate(
        { loginId: userId },
        { $push: { courses: cid } }, 
        { new: true, useFindAndModify: false } 
      );
      console.log("User enrolled in course successfully:", updatedUser);
      return updatedUser;
    } else {
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error enrolling user in course:", error);
    throw error;
  }
};

export const unEnrollUserInCourse = async (userId, cid) => {
  try {
    const user = await findUserById(userId);

    if (user) {
      const updatedUser = await model.findOneAndUpdate(
        { loginId: userId }, 
        { $pull: { courses: cid } }, 
        { new: true, useFindAndModify: false } 
      );

      console.log("User unenrolled from course successfully:", updatedUser);
      return updatedUser;
    } else {
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error unenrolling user from course:", error);
    throw error;
  }
};

export const findUserById = (userId) => model.findOne({ loginId: userId });

export const submitQuizForUser = async (userId, quiz) => {
  try {
    const user = await findUserById(userId);
    console.log("quiz::",quiz);
    
    if (user) {
      const updatedQuiz = await model.findOneAndUpdate(
        { loginId: userId },
        { $push: { quizes: quiz } }, 
        { new: true, useFindAndModify: false } 
      );
      console.log("Submitted quiz successfully for user:", updatedQuiz);
      return updatedQuiz;
    } else {
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error submitting quiz:", error);
    throw error;
  }
};

export const fetchQuizById = async (userId, qid) => {
  try {
    const user1 = await findUserById(userId);
    const user = await model.findOne(
      { loginId: userId, quizes: { $elemMatch: { id: qid } } },
      { "quizes.$": 1 } 
    ).exec();

    if (user && user.quizes.length > 0) {
      const quizDetail = user.quizes[0];
      return quizDetail;
    } else {
      return null; 
    }
  } catch (error) {
    console.error("Error fetching quiz detail:", error);
    throw error;
  }
};

export const findUserByUsername = (username) =>
  model.findOne({ username: username });

export const findUserByCredentials = async (username, password) =>
  await model.findOne({ username, password });

export const updateUser = (userId, user) =>
  model.updateOne({ loginId: userId }, { $set: user });

export const deleteUser = (userId) => model.deleteOne({ loginId: userId });


export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};


export const findUsersByRole = (role) => model.find({ role: role });
