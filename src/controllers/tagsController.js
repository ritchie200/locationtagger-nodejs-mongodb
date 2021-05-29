
const userModel  = require('../models/userModel.js')
const User = userModel.User
const tagModel  = require('../models/tagModel.js')
const tag = tagModel.tag
const tagTypeModel  = require('../models/tagTypeModel.js')
const tagType = tagTypeModel.tagType
const asyncHandler = require('express-async-handler')
// @desc    Create a new tag
// @route   POST /api/tags
// @access  Private
const newTag = asyncHandler(async (req, res) => {
    const {tagName, tagCategory,reviewed,description,tagTypeCode,userId,address,city,state,country,mainContact,mainPhoneNumber,email,latitude,longitude } = req.body
    const image= req.file!=null? req.file.path:"";
    const userRecord = await User.findOne({ user: userId })
    const tagTypeRecord = await tagType.findOne({ tagTypeCode: tagTypeCode })
    const tagRecord = await tag.findOne({ tagName: tagName })
  
    if (tagRecord) {
      res.status(400)
      throw new Error('Tag name already exist.')
    }
  
    const newTagRecord = await tag.create({
        tagName,
        tagCategory,
        reviewed,
        userRecord,
        image,
        description,
        tagTypeRecord,
        address,
        city,
        state,
        country,
        mainContact,
        mainPhoneNumber,
        email,
        latitude,
        longitude
    })

    if (newTagRecord) {
      res.status(201).json({
        tagId: newTagRecord._id,
        tagName: newTagRecord.tagName
      })
    } else {
      res.status(400)
      throw new Error('Please enter the tag details properly.')
    }
  })

// @desc    Get tag
// @route   GET /api/tags/:id
// @access  Private
const getTag = asyncHandler(async (req, res) => {

    var tagRecord = await tag.findOne({ _id: req.params.id })
    if (tagRecord) {
      res.json({
        tagName: tagRecord.tagName,
        tagCategory: tagRecord.tagCategory,
        reviewed: tagRecord.reviewed,
        image: tagRecord.image,
        description: tagRecord.description,
        tagType: tagRecord.tagType,
        address: tagRecord.address,
        city: tagRecord.city,
        state: tagRecord.state,
        country: tagRecord.country,
        mainContact: tagRecord.mainContact,
        mainPhoneNumber: tagRecord.mainPhoneNumber,
        email: tagRecord.email,
        latitude: tagRecord.latitude,
        longitude: tagRecord.longitude
      })
    }  else
    {
      res.status(404)
      throw new Error('Tag record not found. Please try again with a valid tag Id.')
    }
  })

// @desc    Update tag record
// @route   PUT /api/tags
// @access  Private
const updateTagRecord = asyncHandler(async (req, res) => {  
    var tagRecord = await tag.findOne({ _id: req.body.id })
     if (tagRecord) {
        var tagTypeRecord ;
        if(req.body.tagTypeRecord!=null)
        tagTypeRecord = await tagType.findOne({ tagTypeCode: req.body.tagType })
        else
        tagTypeRecord = tagRecord

        tagRecord.tagName = req.body.tagName || tagRecord.tagName
        tagRecord.tagCategory = req.body.tagCategory || tagRecord.tagCategory
        tagRecord.reviewed = req.body.reviewed || tagRecord.reviewed
        tagRecord.image = req.file.path || tagRecord.image
        tagRecord.description = req.body.description || tagRecord.description
        tagRecord.tagType = tagTypeRecord
        tagRecord.address = req.body.address || tagRecord.address
        tagRecord.city = req.body.city || tagRecord.city
        tagRecord.state = req.body.state || tagRecord.state
        tagRecord.country = req.body.country || tagRecord.country
        tagRecord.mainContact = req.body.mainContact || tagRecord.mainContact
        tagRecord.mainPhoneNumber = req.body.mainPhoneNumber || tagRecord.mainPhoneNumber
        tagRecord.email = req.body.email || tagRecord.email
        tagRecord.latitude = req.body.latitude || tagRecord.latitude
        tagRecord.longitude = req.body.longitude || tagRecord.longitude

       const updatedUser = await userProfile.save()
   
       res.json({
        tagId: tagRecord._id,
        tagName: tagRecord.tagName
      })
     }  else
     {
       res.status(404)
       throw new Error('Tag record not found. Please try again with a valid tag Id.')
     }
   })

// @desc    Delete tag
// @route   Delete /api/tags/:id
// @access  Private
const deleteTag = asyncHandler(async (req, res) => {

  var tagRecord = await tag.findOne({ _id: req.params.id })
  if (tagRecord) {
    await tag.remove()
    res.json({ message: 'Tag has been removed successfully.' })
  } else {
    res.status(404)
    throw new Error('Tag record not found. Please try again with a valid tag Id.')
  }
})

// @desc    Get all tags
// @route   GET /api/tags/:userId
// @access  Private/User
const getTags = asyncHandler(async (req, res) => {
  const tags = await tag.find({ user:  req.params.userId  })
  res.json(tags)
})


module.exports = Object.freeze({
  newTag: newTag,
  getTag: getTag,
  updateTagRecord: updateTagRecord,
  deleteTag:deleteTag,
  getTags:getTags
});