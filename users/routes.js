import db from "../Database/index.js";
function UsersRoutes(app) {
    app.get("/api/courses/:cid/users", (req, res) => {
        const { cid } = req.params;
        const users = db.users
            .filter((m) => m.course === cid);
        res.send(users);
    });
}
export default UsersRoutes;

