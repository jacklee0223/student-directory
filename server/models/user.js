const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next) {
  // get access to user model
  const user = this;

  // generate a salt and run callback after 10 ms
  bcrypt.genSalt(10, (error, salt) => {
    if (error) return next(error);

    // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) return next(error);

      // overwrite plain text pw with encrypted pw
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(error, isMatched) {
    if (error) return callback(error);

    callback(null, isMatched);
  });
};

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
