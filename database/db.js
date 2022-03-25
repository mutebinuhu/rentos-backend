const mongoose = require('mongoose');
const dbUrl = process.env.MONGO_URL;
const connectDB = async () =>{
    try {
      if(mongoose.connect(dbUrl, {useNewUrlParser:true, useUnifiedTopology:true})){
          console.log("connected to db");
      } 
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = connectDB;