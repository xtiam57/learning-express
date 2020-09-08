const mongoose = require('mongoose');

const DATABASE_URI = process.env.DB_URI;

module.exports = async () => {
  try {
    await mongoose.connect(DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    console.log('Connected to MongoDB.');
  } catch (err) {
    console.log(err);
  }
};
