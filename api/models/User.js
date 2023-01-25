const { model, Schema } = require('mongoose');

const userSchema = new Schema({
   email: {
       type: String,
       required: true,
       unique: true 
   } ,
   username: {
       type: String,
       required: true,
       unique: true 
   },
   password: {
       type: String,
       required: true,
   },
   token: {
       type: String
   },
   avatar: {
       type: String
   },
   role: {
       type: String,
       required: true,
       enum: ["USER" || "ADMIN"],
       default: "USER"
      
   },
},
{
    timestamps: true
}
);

module.exports = model('User', userSchema);