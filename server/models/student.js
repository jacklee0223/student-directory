const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define model
const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  grade: Number,
  additionalInfo: String
});

// Create the model class
const StudentModel = mongoose.model('student', studentSchema);

// Export model
module.exports = StudentModel;
