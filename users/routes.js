import db from "../Database/index.js";
import * as dao from "./dao.js";
import { v4 as uuidv4 } from 'uuid';

function UsersRoutes(app) {
    const signin = async (req, res) => {
        const { username, password } = req.body;
        console.log("Signin passed");
        const currentUser = await dao.findUserByCredentials(username, password);
        req.session['currentUser'] = currentUser;
        console.log(currentUser);
        res.json(currentUser);
    };
    const account = async (req, res) => {
        console.log("Account passed");
        res.json(req.session['currentUser']);
    };
    const createUser = async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
    };

    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };

    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
    };

    const findUserById = async (req, res) => {
        console.log("ID CALLED");
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };

    const updateUser = async (req, res) => {
        const { userId } = req.params;
        console.log(userId);
        const status = await dao.updateUser(userId, req.body);
        const currentUser = await dao.findUserById(userId);
        req.session['currentUser'] = currentUser;

        res.json(status);
    };

    const signup = async (req, res) => {
        const { username, password, firstName, lastName, dob, email, role } = req.body;

        const existingUser = await dao.findUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }
        const userId = uuidv4();

        const newUser = {
            _id: userId,
            username,
            password,
            firstName,
            lastName,
            dob,
            email,
            role,
        };
        const createdUser = await dao.createUser(newUser);
        const currentUser = createdUser;
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
    };
    const signout = (req, res) => {
        req.session.destroy();
        res.json(200);
      };
    

    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);

    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/account", account);

    app.get("/api/courses/:cid/users", (req, res) => {
        const { cid } = req.params;
        const users = db.users
            .filter((m) => m.course === cid);
        res.send(users);
    });
}
export default UsersRoutes;

