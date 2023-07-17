const mongoose = require("mongoose");

const app = require('./app')

const DB_HOST = "mongodb+srv://byxgalter:v4J6ko42TsqaV6DE@cluster0.4p2s1zr.mongodb.net/contacts_reader?retryWrites=true&w=majority"

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
  .then(() => {app.listen(3000, () => {
  console.log("Database connection successful")
})
})
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })


