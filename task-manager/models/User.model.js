const mongoose = require("mongoose");
const validator = require("validator");
const Task = require('../models/task.model');

//schema creates a structure for our data document
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("You can't use this as a password!");
      }
    },
  },
  authToken: {
    type: String,
  },
  avatar: {
    type: Buffer
  }

}, {
  timestamps: true
});

//Delete user tasks when user is removed or removes his account
UserSchema.pre('remove', async (next) => {
  const user = this
  await Task.deleteMany({ owner: user._id })

  next();
})


//Here we created a virtual field to show users relation with tasks
UserSchema.virtual('tasks', {
  ref: 'task',
  localField: '_id',
  foreignField: 'owner'
})

module.exports = mongoose.model("user", UserSchema, "users"); // modelname,schema,collection name
