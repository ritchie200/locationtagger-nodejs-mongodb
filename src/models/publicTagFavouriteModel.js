
const mongoose = require('mongoose')

const publicTagFavouriteSchema = mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User',
      },
    tag: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Tag',
    }
  },
  {
    timestamps: true,
  }
)

const publicTagFavourite = mongoose.model('PublicTagFavourite', publicTagFavouriteSchema)

module.exports = {
  publicTagFavourite
};


