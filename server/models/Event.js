const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
      default: Date.now()
      // date utils
    },
    location: {
      type: String,
      required: false,
    }
});

const Event = mongoose.model('event', EventSchema);

module.exports = Event;