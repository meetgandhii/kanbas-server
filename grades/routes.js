import db from "../Database/index.js";

function GradesRoutes(app) {
  app.get('/api/courses/:cid/enrollments', (req, res) => {
    const { cid } = req.params;

    // Replace this with your actual data retrieval logic
    const enrollments = db.enrollments.filter(enrollment => enrollment.course === cid);
    const gradestableheads = db.gradestableHead.filter(gradestableHead => gradestableHead.course === cid);

    // Retrieve user information and grades for each enrollment
    const enrollmentsWithDetails = enrollments.map(enrollment => {
      const user = db.users.find(user => user._id === enrollment.user);
      const selectiveGrades = gradestableheads.map(head => {

        const grades = db.grades.filter(grade => grade.student === enrollment.user && grade.assignment === head._id);

        return {


          ...grades,
        };
      });

      return {
        ...enrollment, user,
        selectiveGrades,
      };
    });

    res.json(enrollmentsWithDetails);
  });
}

export default GradesRoutes;
