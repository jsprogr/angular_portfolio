const express = require('express')
const mongoose = require('mongoose')
const bodyParcer = require('body-parser')
const passport = require('passport')
const path = require('path')

const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const analyticsRoutes = require('./routes/analytics')

const keys = require('./config/keys')

const app = express()

mongoose.connect(keys.mongoURI,   {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log('MongoDB connected.'))
  .catch((err) => console.log(err))

// libs
app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
// парсер тела пост запроса
app.use(bodyParcer.urlencoded({extended: true}))
app.use(bodyParcer.json())
app.use(require('cors')())

//routes
app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)
app.use('/api/analytics', analyticsRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist/client'))

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname, 'client', 'dist', 'client', 'index.html'
      )
    )
  })
}

module.exports = app

