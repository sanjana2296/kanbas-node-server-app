import model from "./model.js";

export const findAllAssignments = async () => {
  return await model.find();
};

export const findAssignmentByCourseId = async (id) => {
  return await model.find({ course: id });
};

export const findAssignmentById = async (id) => {
  return await model.findOne({ _id: id });
};

export const createAssignment = async (assignment) => { 
      try {
        const createdAssignment = await model.create(assignment);
        return createdAssignment;
      } catch (error) {
        throw error;
      }
};

export const updateAssignment = async (id, assignment) => {
  await model.updateOne({ _id: id }, { $set: assignment });
};

export const deleteAssignment = async (id) => {
  await model.deleteOne({ _id: id });
};
