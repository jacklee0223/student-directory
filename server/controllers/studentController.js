const Student = require('../models/student');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const ObjectID = require('mongodb').ObjectID;

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

exports.updateStudent = (req, res, next) => {
  const { _id, firstName, lastName, grade, additionalInfo } = req.body;
  const objId = ObjectID(_id);
  const updateFields = {
    _id: objId,
    firstName,
    lastName,
    grade,
    additionalInfo
  };

  MongoClient.connect(url, function(error, db) {
    if (error) throw error;
    const dbo = db.db('students-directory');
    const collection = dbo.collection('students');
    const myquery = { _id: objId };
    const newvalues = { $set: updateFields };
    collection.updateOne(myquery, newvalues, error => {
      if (error) throw error;

      collection.find({}).toArray(function(error, result) {
        if (error) throw error;
        res.json(result);
        db.close();
      });
    });
  });
};
