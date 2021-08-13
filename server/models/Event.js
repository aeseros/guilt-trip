const mongoose = require('mongoose');
const { Schema } = mongoose;

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
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: String,
      required: false
    }
});

const Event = mongoose.model('event', EventSchema);

module.exports = Event;