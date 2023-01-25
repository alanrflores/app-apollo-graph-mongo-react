const { model, Schema} = require('mongoose');

const ImageSchema = new Schema({
  url: {type: String, required: true},
  title: {type: String, required: true}
});

const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: String, required: true},
  stock: { type: String, required: true},
  images: [ImageSchema]
  
},{
    timestamps: true,
});


module.exports = model('Product', productSchema);