
const express = require('express')
const path = require('path')

const router = express.Router()
const tagsController = require('../controllers/tagsController.js')
const authMiddleware =  require('../middleware/authMiddleware.js')
const multer =  require('multer')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'images/tag/')
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

/**
 * @swagger
 * /:
 *   post:
 *          "tags": ["tags"]
 *          consumes:
 *          - multipart/form-data
 *          summary: Create new Tag - Authorized Access
 *          security: 
 *           - bearerAuth: []
 *          requestBody:
 *              content:
 *                multipart/form-data:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         tagName:          # <!--- tagName
 *                            type: string
 *                         tagCategory:          # <!--- tagCategory
 *                            type: string
 *                         reviewed:          # <!--- reviewed
 *                            type: boolean
 *                         description:          # <!--- description
 *                            type: string
 *                         tagTypeCode:          # <!--- tagTypeCode
 *                            type: string
 *                         userId:          # <!--- userId
 *                            type: string
 *                         address:          # <!--- address
 *                            type: string
 *                         city:          # <!--- city
 *                            type: string
 *                         state:          # <!--- state
 *                            type: string
 *                         country:          # <!--- country
 *                            type: string
 *                         mainContact:          # <!--- mainContact
 *                            type: string
 *                         mainPhoneNumber:          # <!--- mainPhoneNumber
 *                            type: string
 *                         email:          # <!--- email
 *                            type: string
 *                         latitude:          # <!--- latitude
 *                            type: string
 *                         longitude:          # <!--- longitude
 *                            type: string
 *          responses:
 *              '200':
 *                  description: Tag Details
 *                  application/json:
 *   put:
 *          "tags": ["tags"]
 *          consumes:
 *          - multipart/form-data
 *          summary: Update Tag - Authorized Access
 *          security: 
 *           - bearerAuth: []
 *          requestBody:
 *              content:
 *                multipart/form-data:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         id:          # <!--- tagId
 *                            type: string
 *                         tagName:          # <!--- tagName
 *                            type: string
 *                         tagCategory:          # <!--- tagCategory
 *                            type: string
 *                         reviewed:          # <!--- reviewed
 *                            type: boolean
 *                         description:          # <!--- description
 *                            type: string
 *                         tagTypeCode:          # <!--- tagTypeCode
 *                            type: string
 *                         userId:          # <!--- userId
 *                            type: string
 *                         address:          # <!--- address
 *                            type: string
 *                         city:          # <!--- city
 *                            type: string
 *                         state:          # <!--- state
 *                            type: string
 *                         country:          # <!--- country
 *                            type: string
 *                         mainContact:          # <!--- mainContact
 *                            type: string
 *                         mainPhoneNumber:          # <!--- mainPhoneNumber
 *                            type: string
 *                         email:          # <!--- email
 *                            type: string
 *                         latitude:          # <!--- latitude
 *                            type: string
 *                         longitude:          # <!--- longitude
 *                            type: string
 *          responses:
 *              '200':
 *                  description: Tag Details
 *                  application/json:
 * /{id}:
 *   get:
 *     "tags": ["tags"]
 *     summary: Get Details of Tag - Authorized Access
 *     description: Get Details of Tag
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Tag Id
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *   delete:
 *     "tags": ["tags"]
 *     summary: Delete the tag - Authorized Access
 *     description: Delete the tag
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Tag Id
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
* /{userId}:
 *   get:
 *     "tags": ["tags"]
 *     summary: Get all Tags of user - Authorized Access
 *     description: Get all user tags
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: User Id
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 */

  router
  .route('/')
  .put(upload.single('image'),authMiddleware.protect, tagsController.newTag)
  .post(upload.single('image'),authMiddleware.protect, tagsController.updateTagRecord)

  router
  .route('/:id')
  .get(authMiddleware.protect, tagsController.getTag).delete(authMiddleware.protect, tagsController.deleteTag)

  router
  .route('/:userId')
  .get(authMiddleware.protect, tagsController.getTags)

  module.exports = Object.freeze({
    router: router
  });

 
