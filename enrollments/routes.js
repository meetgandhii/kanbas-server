import db from "../Database/index.js";
function EnrollmentsRoutes(app) {
app.get("/api/courses/:cid/enrollments", (req, res) => {
        const { cid } = req.params;
        const enrollments = db.enrollments
            .filter((m) => m.course === cid);
        res.send(enrollments);
    });
}
export default EnrollmentsRoutes;

