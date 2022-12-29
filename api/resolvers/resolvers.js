require('dotenv').config();

const Product = require("../models/Product");
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const resolvers = {
    Query: {
        hello: () => 'Hello World',
        getAllProduct : async() => {
            const product = await Product.find()
            return product;
        },
        //no tengo una consulta para el parent por esos el guion bajo
        findProduct: async(_, args) => {
            const productId = await Product.findById(args.id)
            return productId;
        },
       user: async(_, args) => {
          const userId = await User.findById(args.id)
          return userId;
        },
    },
    Mutation: {
        createProduct: async(_, args) => {
            const { title, price, imgUrl, description } = args.product;
            const newProduct = new Product({title, price, imgUrl, description})
            console.log(newProduct); 
            await newProduct.save();
            return newProduct;
        },
        deleteProduct: async(_, args) => {
            await Product.findByIdAndDelete(args.id)
            return "Product DELETE"
        },
        updateProduct: async(_, {product, id}) => {
            //console.log(product)
            const ProductUpdate = await Product.findByIdAndUpdate(id,{
                //propiedad $set actualiza los campos que trae Product, es mas generico 
                $set: product
            }, {new: true} );
            return ProductUpdate;
        },
        registerUser: async(_, {registerInput: {username, email, password} }) => {
            const oldUser = await User.findOne({ email })
            if(oldUser){
                throw new Error('A user is already registered with the email' + email)
            }
            const hashed = await bcrypt.hash(password, 10)

            const newUser = new User({
                  username: username,
                  email: email,
                  password: hashed
              });

              const token = jwt.sign({ id: newUser._id, email} , process.env.JWT_SECRET, {
                  expiresIn: "2h"
              });

              newUser.token = token ;
              const response = await newUser.save();

              return {
                  id: response.id,
                  ...response._doc
              }
        },
        loginUser: async(_, {loginInput: {email, password} }) => {
            
             const user = await User.findOne({ email });
             console.log("user", user)
             const valid = await bcrypt.compare(password, user.password);
             if(user && valid){
                const token = jwt.sign({ id: user._id, email} , process.env.JWT_SECRET, {
                    expiresIn: "2h"
                });
                user.token = token;

                return {
                    id: user.id,
                    ...user._doc
                }
            }else{
               throw new Error("Incorrect Password!")
            }
            //   return jwt.sign({ id: user._id}, process.env.JWT_SECRET); 
        },

    }

};

module.exports = { resolvers } ;