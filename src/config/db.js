const mongoose = require('mongoose');

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('Database connected');
  } catch (error) {
    console.log(error);
  }
};

module.exports = db;
