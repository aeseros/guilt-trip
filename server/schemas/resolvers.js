const Event = require('../models/Event.model');
// const User = require('../models/User.model');

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
    
  }
};

module.exports = resolvers;
