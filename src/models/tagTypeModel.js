
const mongoose = require('mongoose')

const tagTypeSchema = mongoose.Schema(
  {
     tagTypeCode: {
        type: String,
        required: true
      },
      tagTypeName: {
        type: String,
        required: true
    },
    isDefault: {
      type: Boolean,
      required: true
  }
  },
  {
    timestamps: true,
  }
)

const tagType = mongoose.model('TagType', tagTypeSchema)
module.exports = {
  tagType
};
