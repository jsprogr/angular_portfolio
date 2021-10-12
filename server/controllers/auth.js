const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const errorHandler = require('../utils/errorHandler')
const User = require('../models/User')
const keys = require('../config/keys')


module.exports.login = async function(req, res) {
  const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    if (passwordResult) {
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, keys.jwt, {expiresIn: 60 * 60 * 24})

      res.status(200).json({
        token: `Bearer ${token}`
      })
    } else {
      res.status(401).json({
        message: 'Логин или пароль не совпадают!'
      })
    }
  } else {
    res.status(404).json({
      message: 'Пользовфатель с таким именем не найден'
    })
  }
}

module.exports.register = async function(req, res) {
  const candidate = await User.findOne({email: req.body.email})
  if (candidate) {
    res.status(409).json({
      message: 'Такой email уже существует в систему, попробуйте другой или восстановите пароль'
    })
  } else {
    const salt = bcrypt.genSaltSync(10)
    const password =  req.body.password
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    })
    try {
      await user.save()
      res.status(201).json(user)
    } catch(e) {
      errorHandler(res, e)
    }
  }
}

module.exports.test = async function(req, res) {
  console.log('is test 23');
  try {
    res.status(200).json({test: 'hello 3'})
  } catch (e) {
    errorHandler(res, e)
  }

}
