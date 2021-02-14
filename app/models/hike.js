const mongoose = require('mongoose')

const hikeSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  trails: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    required: false
  },
  elevation: {
    type: Number,
    required: false
  },
  timeTaken: {
    type: String,
    required: false
  },
  mountainsClimbed: {
    type: String,
    required: false
  },
  trailNotes: {
    type: String,
    required: false
  },
  hikedWith: {
    type: String,
    required: false
  },
  picture: {
    type: String,
    required: false
  },
  rating: {
    type: String,
    required: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Hike', hikeSchema)
