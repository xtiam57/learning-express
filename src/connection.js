const mongoose = require('mongoose');

async function connectToDB() {
  try {
    const db = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    console.log('Connected to MongoDB.');
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectToDB;
