const Student = require('../models/student');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';

exports.getAllStudents = (req, res, next) => {
  MongoClient.connect(url, (error, db) => {
    if (error) throw error;
    const dbo = db.db('students-directory');
    dbo
      .collection('students')
      .find({})
      .toArray(function(error, result) {
        if (error) throw error;
        res.json(result);
        db.close();
      });
  });
};

exports.updateStudent = (req, res, next) => {
  console.log(req.body);
  // const { _id, firstName, lastName, grade, additionalInfo } = req.body;
};

exports.createStudent = (req, res, next) => {
  const { firstName, lastName, grade, additionalInfo } = req.body;
  const newStudent = new Student({
    firstName,
    lastName,
    grade,
    additionalInfo
  });

  newStudent.save(error => {
    if (error) return next(error);

    MongoClient.connect(url, (error, db) => {
      if (error) throw error;
      const dbo = db.db('students-directory');
      dbo
        .collection('students')
        .find({})
        .toArray(function(error, result) {
          if (error) throw error;
          res.json(result);
          db.close();
        });
    });
  });
};
