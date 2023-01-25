const { connect } = require('mongoose');
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const connectDb = async () => {
    try {
      await connect(process.env.MONGO_DB)  
      console.log("Mongo db connect");
    } catch (error) {
      console.error(error)  
    }
};


module.exports =  { connectDb };