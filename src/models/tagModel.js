
const mongoose = require('mongoose')
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const tagSchema = mongoose.Schema(
  {
    tagName: {
      type: String,
      required: true,
    },
    tagCategory: {
      type: Boolean,
      required: true,
    },
    reviewed: {
      type: Boolean,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
    image: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    tagType: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'TagType',
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: false
    },
    state: {
      type: String,
      required: false
    },
    country: {
      type: String,
      required: false
    },
    mainContact: {
      type: String,
      required: false
    },
    mainPhoneNumber: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: false
    },
    latitude: {
      type: String,
      required: false
    },
    longitude: {
      type: String,
      required: false
    },
    reviews: [reviewSchema]
  },
  {
    timestamps: true,
  }
)

const tag = mongoose.model('Tag', tagSchema)

module.exports = {
  tag
};


