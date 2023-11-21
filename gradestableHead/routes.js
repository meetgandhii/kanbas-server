import db from "../Database/index.js";
function GradestableHeadRoutes(app) {
    app.get("/api/courses/:cid/gradestableHead", (req, res) => {
        const { cid } = req.params;
        const gradestableheads = db.gradestableHead.filter(gradestableHead => gradestableHead.course === cid)
        res.send(gradestableheads);
    });

}
export default GradestableHeadRoutes;

