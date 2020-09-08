const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
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
