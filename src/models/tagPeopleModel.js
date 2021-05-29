
const mongoose = require('mongoose')

const tagPeopleSchema = mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
   LastName: {
        type: String,
        required: false,
      },
    Email: {
      type: String,
      required: false,
    },
    PhoneNumber: {
        type: String,
        required: false,
      },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    tag: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'Tag',
    }
  },
  {
    timestamps: true,
  }
)

const tagPeople = mongoose.model('TagPeople', tagPeopleSchema)
module.exports = {
  tagPeople
};
