
const tagTypeModel  = require('../models/tagTypeModel.js')
const tagType = tagTypeModel.tagType
const asyncHandler = require('express-async-handler')
// @desc    Create a new tag type
// @route   POST /api/tagtypes
// @access  Private/Admin
const newTagType = asyncHandler(async (req, res) => {
    const {tagTypeCode, tagTypeName,isDefault} = req.body
    const tagTypeRecord = await tagType.findOne({ tagTypeCode: tagTypeCode })
  
    if (tagTypeRecord) {
      res.status(400)
      throw new Error('Tag type already exist.')
    }
  
    const newTagTypeRecord = await tagType.create({
        tagTypeCode,
        tagTypeName,
        isDefault
    })

    if (newTagTypeRecord) {
      res.status(201).json({
        tagTypeName: newTagTypeRecord.tagTypeName,
        tagTypeCode: newTagTypeRecord.tagTypeCode
      })
    } else {
      res.status(400)
      throw new Error('Please enter the tag type details properly.')
    }
  })

// @desc    Get tag type
// @route   GET /api/tagtypes/:tagTypeCode
// @access  Private/Admin
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


module.exports = Object.freeze({
  newTagType: newTagType,
  getTagType: getTagType,
  updateTagType: updateTagType,
  deleteTagType: deleteTagType,
  getTagTypes:getTagTypes
});