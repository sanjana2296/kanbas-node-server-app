import model from "./model.js";

export const findAllCourses = async () => {
  try {
    const courses = await model.find();
    return courses;
  } catch (error) {
    console.error("Error finding courses:", error);
    throw error;
  }
};

export const findByCourseId = async (id) => {
  try{
    const course = await model.findOne({ cid: id });
    return course;
  }catch(error){
    console.error("Error finding courses:", error);
    throw error;
  }

};

export const createCourse = async (course) => {
  try{
    delete course._id;
    course.cid = Date.now().toString();
    return await model.create(course);
  }catch(error) {
    console.error("Error finding courses:", error);
    throw error;
  }
  
};

export const updateCourse = async (id, course) => {
  try{
    await model.updateOne({ cid: id }, { $set: course });
  }catch(error) {
    console.error("Error finding courses:", error);
    throw error;
  }
 
};

export const deleteCourse = async (id) => {
  try {
    await model.deleteOne({ cid: id });
    console.log("Deleted");
  } catch (error) {
    console.error("Error finding courses:", error);
    throw error;
  }
};
