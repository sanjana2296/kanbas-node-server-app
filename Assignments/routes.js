import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  const createAssignment = async (req, res) => {
    const assignment = { ...req.body,
        _id: new Date().getTime().toString() };
      await dao.createAssignment(assignment)
      res.send(assignment);
  };

  const deleteAssignment = async (req, res) => {
    const { id } = req.params;
    await dao.deleteAssignment(id);
    res.sendStatus(204);
  };

  const updateAssignment = async (req, res) => {
    const { id } = req.params;
    const assignment = req.body;
    await dao.updateAssignment(id,assignment)
    res.sendStatus(204);
  };

  const findAssignmentByCourseId = async (req, res) => {
    const { id } = req.params;
    const assignment = await dao.findAssignmentByCourseId(id);
    res.json(assignment);
  };

  const findAllAssignments = async (req, res) => {
    const assignments = await dao.findAllAssignments();
    res.json(assignments);
  };

  const findAssignmentByAssignmentId = async (req, res) => {
    const { id } = req.params;
    const assignment = await dao.findAssignmentById(id);
    res.json(assignment);
  };

  app.get("/api/assignments", findAllAssignments);
  app.get("/api/assignments/:id", findAssignmentByCourseId);
  app.get("/api/assignment/:id", findAssignmentByAssignmentId);
  app.delete("/api/assignments/:id", deleteAssignment);
  app.post("/api/assignments", createAssignment);
  app.put("/api/assignments/:id", updateAssignment);
}
