const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
var errorMiddleware = require('./middleware/errorMiddleware.js')
const config =  require('./config/db.js')
const userRoutes = require('./routes/userRoute.js')
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const bodyParser = require('body-parser')
const tagRoute = require('./routes/tagRoute.js')

dotenv.config({path: __dirname + '/.env.production'})

config.connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', userRoutes.router)
app.use('/api/tags', tagRoute.router)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

if (process.env.NODE_ENV === 'production') {
 
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....')
    })
  }

  //const __dirname = path.resolve()
  app.use('/profile', express.static(path.join(__dirname, '/images/profile')))

  const options = {
    definition: {
      openapi: "3.0.1",
      info: {
        title: "Location Tagger API",
        version: "1.0.0",
        description:
          "Contains all backend logic for Location Tagger",
      },
      basePath: '/',
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          }
        }
      },
      servers: [
        {
          url: `${process.env.API_URL}/api/users/`
        },
        {
          url: `${process.env.API_URL}/api/tags/`
        },
      ],
    },
    apis: ["./routes/userRoute.js","./routes/tagRoute.js"],
  };
  
  const specs = swaggerJsDoc(options);
  app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(specs, { explorer: true })
  );

app.use(errorMiddleware.notFound)
app.use(errorMiddleware.errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
