
const mongoose = require('mongoose')

const publicTagCommentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    tag: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Tag',
    },
    isReviewed: {
      type: String,
      required: false,
      default: false
    }
  },
  {
    timestamps: true,
  }
)

const publicTagComment = mongoose.model('PublicTagComment', publicTagCommentSchema)

module.exports = {
  publicTagComment
};


