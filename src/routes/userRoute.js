
const express = require('express')
const path = require('path')

const router = express.Router()
const usersController = require('../controllers/usersController.js')

const authMiddleware = require('../middleware/authMiddleware.js')
const multer = require('multer')


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'src/images/profile/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)
  console.log(mimetype);
  console.log(extname);
  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.route('/').post(usersController.registerUser).get(authMiddleware.protect, authMiddleware.admin, usersController.getUsers)
/**
 * @swagger
 * /:
 *   get:
 *     "tags": ["users"]
 *     summary: Get all Users - Admin Access
 *     description: Get all Users
 *     security: 
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *   post:
 *          "tags": ["users"]
 *          produces:
 *          - application/json
 *          consumes:
 *          - application/json
 *          summary: Create new User - Admin Access
 *          security: 
 *           - bearerAuth: []
 *          requestBody:
 *              content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         password:          # <!--- password
 *                            type: string
 *                         email:          # <!--- email
 *                            type: string
 *                         isAdmin:          # <!--- isAdmin
 *                            type: boolean
 *          responses:
 *              '200':
 *                  description: User Details
 *                  application/json:
 * /{id}:
 *   get:
 *     "tags": ["users"]
 *     summary: Get Details of User - Admin Access
 *     description: Get Details of User
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        description: User ID
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *   put:
 *          "tags": ["users"]
 *          produces:
 *          - application/json
 *          consumes:
 *          - application/json
 *          summary: Update the User Details - Admin Access
 *          security: 
 *           - bearerAuth: []
 *          parameters:
 *            - name: id
 *              in: path
 *          description: User ID
 *          required: true
 *          schema:
 *            type: string
 *          requestBody:
 *              content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         email:          # <!--- email
 *                            type: string
 *                         isAdmin:          # <!--- isAdmin
 *                            type: boolean
 *          responses:
 *              '200':
 *                  description: User Details
 *                  application/json:
 *   delete:
 *     "tags": ["users"]
 *     summary: Delete the user - Admin Access
 *     description: Delete the user
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        description: User ID
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 * /login:
 *        post:
 *          "tags": ["users"]
 *          produces:
 *          - application/json
 *          consumes:
 *          - application/json
 *          summary: Login to the portal - Anonymous Access
 *          requestBody:
 *              content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         email:          # <!--- email
 *                            type: string
 *                         password:          # <!--- password
 *                            type: string
 *          responses:
 *              '200':
 *                  description: User Details
 *                  application/json:
 * /profile/{id}:
 *        get:
 *            "tags": ["users"]
 *            summary: Get Profile Details of User - User Access
 *            description: Get Profile Details of User
 *            security: 
 *            - bearerAuth: []
 *            parameters:
 *            - name: id
 *              in: path
 *              description: User ID
 *              required: true
 *              schema:
 *                type: string
 *            responses:
 *             200:
 *               description: Success
 *               content:
 *               application/json: 
 * /profile:
 *     put:
 *          "tags": ["users"]
 *          consumes:
 *          - multipart/form-data
 *          summary: Update the Profile Details of User - User Access
 *          security: 
 *           - bearerAuth: []
 *          requestBody:
 *              content:
 *                multipart/form-data:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         id:          # <!--- id
 *                            type: string
 *                            required: true
 *                         firstName:          # <!--- firstName
 *                            type: string
 *                            required: true
 *                         lastName:          # <!--- lastName
 *                            type: string
 *                            required: false
 *                         phoneNumber:          # <!--- phoneNumber
 *                            type: string
 *                            required: false
 *                         streetAddress:          # <!--- streetAddress
 *                            type: string
 *                            required: false
 *                         city:          # <!--- city
 *                            type: string
 *                            required: false
 *                         state:          # <!--- state
 *                            type: string
 *                            required: false
 *                         country:          # <!--- country
 *                            type: string
 *                            required: false
 *                         photo:          # <!--- photo
 *                            type: file
 *                            required: false
 *          responses:
 *              '200':
 *                  description: User Details
 *                  application/json:
 */


router.post('/login', usersController.authUser)
router
  .route('/profile/:id')
  .get(authMiddleware.protect, usersController.getUserProfile)
//router
 // .route('/profile')
  //.post(protect, updateUserProfile)

  router
  .route('/profile')
  .put(upload.single('photo'),authMiddleware.protect, usersController.updateUserProfile)


router
  .route('/:id')
  .delete(authMiddleware.protect, authMiddleware.admin, usersController.deleteUser)
  .get(authMiddleware.protect, authMiddleware.admin, usersController.getUserById)
  .put(authMiddleware.protect, authMiddleware.admin, usersController.updateUser)

  module.exports = Object.freeze({
    router: router
  });

