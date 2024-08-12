const mongoose = require ("mongoose")





  //Schema

const userSchema = new mongoose.Schema({
    first_name:{
      type:String,
      require:true,
    },
    last_name:{
      type:String,
    },
    email:{
      type:String,
      require:true,
      unique:true,
    },
    Job_title:{
      type:String,
    },
    gender:{
      type:String,
    },
  },
    {timeStamps :true}
  );




const User = mongoose.model('User', userSchema)

module.exports = User;