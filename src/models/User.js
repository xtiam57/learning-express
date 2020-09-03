const mongoose = require('mongoose');

// Model
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 255,
      trim: true
    },
    email: {
      type: String,
      required: true,
      maxlength: 255,
      trim: true
    },
    password: {
      type: String,
      required: true,
      maxlength: 1024
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    delete ret._id;
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
