const StudentController = require('./controllers/studentController');

module.exports = app => {
  app.get('/api/students/getall', StudentController.getAllStudents);
  app.post('/api/students/create', StudentController.createStudent);
  app.put('/api/students/update', StudentController.updateStudent);
  app.put('/api/students/removeStudent', StudentController.removeStudent);
};
