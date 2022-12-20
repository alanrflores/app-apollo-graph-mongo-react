require('dotenv').config();

const Task = require("../models/Task");
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const resolvers = {
    Query: {
        hello: () => 'Hello World',
        getAllTask : async() => {
            const talk = await Task.find()
            return talk;
        },
        //no tengo una consulta para el parent por esos el guion bajo
        getTask: async(_, args) => {
            const taskId = await Task.findById(args.id)
            return taskId;
        },
       user: async(_, args) => {
          const userId = await User.findById(args.id)
          return userId;
        },
    },
    Mutation: {
        createTask: async(_, args) => {
            const { title, description } = args.task;
            const newTask = new Task({title, description})
            console.log(newTask); 
            await newTask.save();
            return newTask;
        },
        deleteTask: async(_, args) => {
            await Task.findByIdAndDelete(args.id)
            return "TASK DELETE"
        },
        updateTask: async(_, args) => {
            const taskUpdate = await Task.findByIdAndUpdate(args.id,{
                //propiedad $set actualiza los campos que trae task, es mas generico 
                $set: args.task
            }, {new: true} );
            return taskUpdate;
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