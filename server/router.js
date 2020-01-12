const StudentController = require('./controllers/studentController');

module.exports = app => {
  app.get('/api/students/getall', StudentController.getAllStudents);
  app.post('/api/students/create', StudentController.createStudent);
  app.put('/api/students/create', StudentController.updateStudent);
};
