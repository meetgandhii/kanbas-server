import db from "../Database/index.js";
function GradestableHeadRoutes(app) {
    app.get("/api/courses/:cid/gradestableHead", (req, res) => {
        const { cid } = req.params;
        const gradestableHead = db.gradestableHead
            .filter((m) => m.course === cid);
        res.send(gradestableHead);
    });

}
export default GradestableHeadRoutes;

