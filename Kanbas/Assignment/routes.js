import assignments from "../Database/assignments.js";
import Database from "../Database/index.js";
export default function AssingmentsRoutes(app) {
  app.get("/api/assignments", (req, res) => {
    const assignments = Database.assignments;
    res.send(assignments);
  });

  app.get("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const assignments = Database.assignments.filter((a) => a.course === id);
    res.send(assignments);
  });

  app.get("/api/assignment/:id", (req, res) => {
    const { id } = req.params;
    const assignments = Database.assignments.filter((a) => a._id === id);
    res.send(assignments);
  });

  app.delete("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    Database.assignments = Database.assignments.filter((a) => a._id !== id);
    res.sendStatus(204);
  });
  app.post("/api/assignments", (req, res) => {
    const assignment = { ...req.body,
      _id: new Date().getTime().toString() };
    Database.assignments.push(assignment);
    res.send(assignment);
  });

  app.put("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const assignment = req.body;
    Database.assignments = Database.assignments.map((a) =>
      a._id === id ? { ...a, ...assignment } : a
    );
    res.sendStatus(204);
  });

}
