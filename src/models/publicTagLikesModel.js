
const mongoose = require('mongoose')

const publicTagLikesSchema = mongoose.Schema(
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

const publicTagLike = mongoose.model('PublicTagLikes', publicTagLikesSchema)

module.exports = {
  publicTagLike
};
