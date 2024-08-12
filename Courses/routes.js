import * as dao from "./dao.js";

export default function CourseRoutes(app) {

    const createCourse = async(req,res) =>{
        const course = { ...req.body,
            _id: new Date().getTime().toString() };
            const status  = await dao.createCourse(course);
          res.send(course);
    }

    const findAllCourses = async(req,res) =>{
        const courses = await dao.findAllCourses();
        res.send(courses);
    }

    const findCourseById = async(req,res) =>{
        const {id}  = req.params;
        const course = await dao.findByCourseId(id);
        res.send(course);
    }

    const deleteCourseById = async(req,res) =>{
        const { id } = req.params;
        console.log(id)
        await dao.deleteCourse(id);
        res.sendStatus(204);
    }

    const updateCourseById = async(req,res) =>{
        const { id } = req.params;
        const course = req.body;
        await dao.updateCourse(id,course);
        res.sendStatus(204);
    }
  app.post("/api/courses",createCourse);
  app.get("/api/courses/:id",findCourseById);
  app.get("/api/courses",findAllCourses);
  app.delete("/api/courses/:id",deleteCourseById);
  app.put("/api/courses/:id",updateCourseById);
}
