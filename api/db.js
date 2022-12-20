const { connect } = require('mongoose');


const connectDb = async () => {
    try {
      await connect(process.env.MONGO_DB)  
      console.log("Mongo db connect");
    } catch (error) {
      console.error(error)  
    }
};


module.exports =  { connectDb };