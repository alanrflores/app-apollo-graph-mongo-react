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
},
{
    timestamps: true
}
);

module.exports = model('User', userSchema);