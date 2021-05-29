
const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken.js').generateToken
const userModel = require('../models/userModel.js')
const User = userModel.User;
const userProfileModel = require('../models/userProfileModel.js')
const UserProfile = userProfileModel.UserProfile;
const bcrypt = require('bcryptjs')

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body
  const user = await User.findOne({ email })
  console.log(user);
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    email,
    password,
  })

 //Create User Profile Record also
 const userProfile = await UserProfile.create({
   user:user
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile/:id
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {

  var userProfile = await UserProfile.findOne({ user: req.params.id })
  if (userProfile) {
    res.json({
      user: userProfile.user,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      phoneNumber: userProfile.phoneNumber,
      photo: userProfile.photo,
      streetAddress: userProfile.streetAddress,
      city: userProfile.city,
      state: userProfile.state,
      country: userProfile.country
    })
  } else {
        userProfile = insertProfileRecordForUser(req.params.id);
        if (userProfile) {
        res.json({
          user: userProfile.user,
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          phoneNumber: userProfile.phoneNumber,
          photo: userProfile.photo,
          streetAddress: userProfile.streetAddress,
          city: userProfile.city,
          state: userProfile.state,
          country: userProfile.country
        })
      }
      else
      {
        res.status(404)
        throw new Error('User Profile Detail not found')
      }
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile/:id
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {


 var userProfile = await UserProfile.findOne({ user: req.body.id })

  if (userProfile) {
    userProfile.firstName = req.body.firstName || userProfile.firstName
    userProfile.lastName = req.body.lastName || userProfile.lastName
    userProfile.phoneNumber = req.body.phoneNumber || userProfile.phoneNumber
    userProfile.photo = req.file.path || userProfile.photo
    userProfile.streetAddress = req.body.streetAddress || userProfile.streetAddress
    userProfile.city = req.body.city || userProfile.city
    userProfile.state = req.body.state || userProfile.state
    userProfile.country = req.body.country || userProfile.country

    const updatedUser = await userProfile.save()

    res.json({
      user: userProfile.user,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      phoneNumber: userProfile.phoneNumber,
      photo: userProfile.photo,
      streetAddress: userProfile.streetAddress,
      city: userProfile.city,
      state: userProfile.state,
      country: userProfile.country
    })
  } else {
      userProfile = insertProfileRecordForUser(req.body.id);
      if (userProfile) {
        userProfile.firstName = req.body.firstName || userProfile.firstName
        userProfile.lastName = req.body.lastName || userProfile.lastName
        userProfile.phoneNumber = req.body.phoneNumber || userProfile.phoneNumber
        userProfile.photo = req.body.photo || userProfile.photo
        userProfile.streetAddress = req.body.streetAddress || userProfile.streetAddress
        userProfile.city = req.body.city || userProfile.city
        userProfile.state = req.body.state || userProfile.state
        userProfile.country = req.body.country || userProfile.country
    
        const updatedUser = await userProfile.save()
    
        res.json({
          user: userProfile.user,
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          phoneNumber: userProfile.phoneNumber,
          photo: userProfile.photo,
          streetAddress: userProfile.streetAddress,
          city: userProfile.city,
          state: userProfile.state,
          country: userProfile.country
        })
      }
      else
      {
        res.status(404)
        throw new Error('User Profile Detail not found')
      }
      
 }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

   //Insert new record in profile
   const insertProfileRecordForUser = async (userId)=>
   {
    const user = await User.findById(userId)
    console.log(user);
 const userProfile = await UserProfile.create({
  user:user
 })
 console.log(userProfile);
 return userProfile;
   }


module.exports = Object.freeze({
  authUser: authUser,
  registerUser: registerUser,
  getUserProfile: getUserProfile,
  updateUserProfile: updateUserProfile,
  getUsers:getUsers,
  deleteUser:deleteUser,
  getUserById:getUserById,
  updateUser:updateUser
});
