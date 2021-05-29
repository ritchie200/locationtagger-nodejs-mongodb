
const mongoose = require('mongoose')

const userProfileSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: false,
    },
   lastName: {
        type: String,
        required: false,
      },
   phoneNumber: {
        type: String,
        required: false,
      },
   photo: {
        type: String,
        required: false,
      },
      streetAddress: {
        type: String,
        required: false,
      }, 
      city: {
        type: String,
        required: false,
      }, 
      state: {
        type: String,
        required: false,
      }, 
      country: {
        type: String,
        required: false,
      },    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    }
  },
  {
    timestamps: true,
  }
)

const UserProfile=  mongoose.model('UserProfile', userProfileSchema)
module.exports = {
  UserProfile
}