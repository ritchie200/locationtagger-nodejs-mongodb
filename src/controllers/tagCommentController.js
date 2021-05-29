
const tagModel = require('../models/tagModel.js')
const tag = tagModel.tag
const userModel = require('../models/userModel.js')
const user = userModel.User
const publicTagCommentsModel = require('../models/publicTagCommentsModel.js')
const publicTagComment = publicTagCommentsModel.publicTagComment
const asyncHandler = require('express-async-handler')
// @desc    Create a new tag comment
// @route   POST /api/tagComments
// @access  Private/User
const newTagComment = asyncHandler(async (req, res) => {
    const {userId, tagId,comment} = req.body
    const tagRecord = await tag.findOne({ _id: tagId })
    const userRecord = await user.findOne({ _id: userId })
  
    const newTagCommentRecord = await publicTagComment.create({
        comment,
        userRecord,
        tagRecord
    })

    if (newTagCommentRecord) {
      res.status(201).json({
        tagId: newTagCommentRecord.tag._id
      })
    } else {
      res.status(400)
      throw new Error('Please enter the tag type details properly.')
    }
  })

// @desc    Get tag type
// @route   GET /api/tagtypes/:tagTypeCode
// @access  Private/User
const getTagType = asyncHandler(async (req, res) => {

    var tagTypeRecord = await tagType.findOne({ tagTypeCode: req.params.tagTypeCode })
    if (tagTypeRecord) {
      res.json({
        tagTypeName: tagTypeRecord.tagTypeName,
        tagTypeCode: tagTypeRecord.tagTypeCode,
        isDefault: tagTypeRecord.isDefault
      })
    }  else
    {
      res.status(404)
      throw new Error('Tag type record not found. Please try again with a valid tag type Id.')
    }
  })

// @desc    Update tagtype record
// @route   PUT /api/tagtypes
// @access  Private/Admin
const updateTagType= asyncHandler(async (req, res) => {  
    var tagTypeRecord = await tagType.findOne({ tagTypeCode: req.body.tagTypeCode })
     if (tagTypeRecord) {
        tagTypeRecord.tagTypeName = req.body.tagTypeName || tagTypeRecord.tagTypeName
        tagTypeRecord.tagTypeCode = req.body.tagTypeCode || tagTypeRecord.tagTypeCode
        tagTypeRecord.isDefault = req.body.isDefault || tagTypeRecord.isDefault
       const updatedTagType = await tagType.save()
   
       res.json({
        tagTypeName: updatedTagType.tagTypeName,
        tagTypeCode: updatedTagType.tagTypeCode
      })
     }  else
     {
       res.status(404)
       throw new Error('Tag type record not found. Please try again with a valid tag type code.')
     }
   })

// @desc    Delete tag type
// @route   Delete /api/tagtypes/:tagTypeCode
// @access  Private/Admin
const deleteTagType = asyncHandler(async (req, res) => {

 var tagTypeRecord = await tagType.findOne({ tagTypeCode: req.params.tagTypeCode })
  if (tagTypeRecord) {
    await tagType.remove()
    res.json({ message: 'Tag type has been removed successfully.' })
  } else {
    res.status(404)
    throw new Error('Tag type record not found. Please try again with a valid tag type code.')
  }
})

// @desc    Get all tagtypes
// @route   GET /api/tagtypes
// @access  Private/Admin
const getTagTypes = asyncHandler(async (req, res) => {
  const tagType = await tagType.find({})
  res.json(tagType)
})

export {
  newTagComment,
  getTagType,
  updateTagType,
  deleteTagType,getTagTypes
}

module.exports = Object.freeze({
  newTagComment: newTagComment,
  getTagType: getTagType,
  updateTagType: newTagComment,
  deleteTagType: deleteTagType,
  getTagTypes:getTagTypes
});
