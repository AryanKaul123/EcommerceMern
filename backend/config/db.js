const mongoose = require("mongoose")


async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
          
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000  // Increase timeout to 30 seconds
    });
    }catch(err){
        console.log(err)
    }
}

module.exports = connectDB
