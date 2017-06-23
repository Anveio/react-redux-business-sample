const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

/* Mongoose: mpromise (mongoose's default promise library) is deprecated,
plug in your own promise library instead:
http://mongoosejs.com/docs/promises.html */
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid email address.'],
    required: 'Please enter an email.'
  },
  username: {
    type: String,
    trim: true,
    required: 'Please enter a username.'
  }
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
