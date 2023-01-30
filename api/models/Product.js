const { model, Schema} = require('mongoose');

const ImageSchema = new Schema({
  url: {type: String, required: true},
  title: {type: String, required: true}
});

const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true},
  stock: { type: Number, required: true},
  images: [ImageSchema]
  
},{
    timestamps: true,
});


module.exports = model('Product', productSchema);