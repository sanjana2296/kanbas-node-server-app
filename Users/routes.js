import * as dao from "./dao.js";
let currentUser = null;
let currentU = null;
export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };
  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
    return;
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    const status = await dao.updateUser(userId, req.body);
    console.log(status);
    res.json(status);
  };
  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    const loginId = generateLoginId();
    const role = "STUDENT"
    if (user) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    const currentUser = await dao.createUser({...req.body,loginId,role});
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const generateLoginId = () => {
    const randomNumber = Math.floor(Math.random() * 900000000) + 100000000;
    const formattedNumber = String(randomNumber).padStart(9, '0');
    const loginId = formattedNumber + 'S';
      return loginId;
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    const  currentUser = await dao.findUserByCredentials(username, password);
    console.log("current user" , currentUser)
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      currentU = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };
  const signout = (req, res) => {
    currentU = null;
    req.session.destroy();
    res.sendStatus(200);
  }

  const profile = async (req, res) => {
    // const currentUser = req.session["currentUser"];
    const currentUser = currentU;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    res.json(currentUser);
  };

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}
