const Event = require('../models/Event');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { signToken } = require('../utils/auth');
const { UserInputError, AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    // get all events
    getAllEvents: async () => {
      // const events = await Event.find()
      // return events
      return await Event.find();
    },
    // getEvent: async (_, args, _, _) => {
    //   const {id} = args
    // }
  },
  Mutation: {
    createEvent: async (parent, args, context, info) => {
      const { title, description, location, date } = args.event
      const event = new Event({ title, description, location, date })
      await event.save();
      return event;
    },

    createUser: async (parent, args, context, info) => {
      const { username, email, password } = args.user
      const newUser = new User({ username, email, password })
      await newUser.save();

      // display error on front end
      const user = await User.findOne({ username });
      if(user){
        throw new UserInputError('Username is taken'), {
          errors: {
            username: 'This username is taken'
          }
        }
      }

      const token = signToken(newUser);
      
      return { token, newUser };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if(!user) {
        throw new AuthenticationError('user does not exist')
      }

      const correctPassword = await User.findOne({ password });

      if(!correctPassword) {
        throw new AuthenticationError('incorrect password')
      }

      const token = signToker(user)

      return { token, user }
    }
  }
};

module.exports = resolvers;