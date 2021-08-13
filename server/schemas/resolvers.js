const Event = require('../models/Event');
const User = require('../models/User');
const { signToken } = require('../utils/auth');
const { UserInputError, AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    getEvent: async (parent, { eventId }) => {
      // const events = await Event.find()
      // return events
      // return await Event.find();
      const event = await Event.findById(eventId);
      if(event){
        return event;
      } else {
        throw new Error('Event not found')
      } 
    },
    getAllEvents: async => {
      console.log('got events')
      return Event.find({});
    }
  },

  Mutation: {
    createEvent: async (parent, args, context, info) => {
      const { title, description, location, date } = args.event
      const event = new Event({ 
        title, 
        description, 
        location,
        user: User._id,
        username: User.username,
        createdAt: new Date().toISOString()
      })
      await event.save();
      return event;
    },

    deleteEvent: async (parent, args, context, info) => {
      const { id } = args
      await Event.findByIdAndDelete(id)
      return "Post has been deleted";
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

      const token = signToken(user)
      return { token, user }
    }
  }
};

module.exports = resolvers;