import db from "../Database/index.js";
function GradesRoutes(app) {
    app.get('/api/courses/:cid/enrollments', (req, res) => {
        const { cid } = req.params;
        // Replace this with your actual data retrieval logic
        const enrollments = db.enrollments.filter(enrollment => enrollment.course === cid);
      
        // Retrieve user information and grades for each enrollment
        const enrollmentsWithDetails = enrollments.map(enrollment => {
          const user = db.users.find(user => user._id === enrollment.user);
          const grades = db.grades.filter(grade => grade.student === enrollment.user);
          return {
            ...enrollment,
            user,
            grades,
          };
        });
      
        res.json(enrollmentsWithDetails);
      });

}
export default GradesRoutes;

