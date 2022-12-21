const { model, Schema} = require('mongoose');

const productSchema = new Schema({
  title: String,
  price: String,
  imgUrl: String,
  description: String
},{
    timestamps: true,
});


module.exports = model('Product', productSchema);