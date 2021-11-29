const express = require('express')
const bodyParser = require('body-parser')
const config = require('./utils/config')
const pool = require('./utils/createpool')
const { check, validationResult } = require('express-validator')

const port = 3000
// const urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express()
app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: false }))

try {
  console.log('Инициируем подключение пула...')
  pool.init()
} catch (error) {
  console.error('Ошибка инициализации пула' + error)
}

app.set('view engine', 'ejs')
app.get('/', function (req, res) {
  config.displayProduct()
  return res.render('index')
})

app.get('/registration', function (req, res) {
  return res.render('registration')
})

/* app.post('/registration', [
  check('name', 'Имя должно состоять не менее 3 букв')
    .exists()
    .isLength({ min: 3 }),
  check('email', 'Email is not valid')
    .isEmail()
    .normalizeEmail()
], async function (req, res) {
  await config.createQuery(req)
  const errors = validationResult(req)
  if (!errors.isEmpty) {
    const alert = errors.array()
    res.render('registration', {
      alert
    })
  }
  return res.render('index')
}) */

/* app.post('/registration', urlencodedParser, [
  check('name', 'Имя должно состоять не менее 3 букв')
    .exists()
    .isLength({ min: 3 }),
  check('email', 'Email is not valid')
    .isEmail()
    .normalizeEmail()
], async function (req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty) {
    return res.status(422).jsonp(errors.array())
  }
}) */

app.post('/registration', [
  check('name', 'Имя должно состоять только из букв и начинаться с заглавной буквы')
    .trim()
    .notEmpty()
    .withMessage('Поле "Имя" не должно быть пустым')
    .isLength({ min: 2 })
    .withMessage('Поле "Имя" должно содержать больше чем 2 символа')
    .not().isInt()
    .withMessage('Поле "Имя" должно содержать только буквы'),
  check('secondname')
    .notEmpty()
    .withMessage('Поле "Фамилия" не должно быть пустым')
    .isLength({ min: 2 })
    .withMessage('Поле "Фамилия" должно содержать больше чем 2 символа')
    .not().isInt()
    .withMessage('Поле "Фамилия" должно содержать только буквы'),
  check('email', 'Email не является допустимым')
    .notEmpty()
    .withMessage('Поле "Email" не должно быть пустым')
    .trim()
    .isEmail()
    .normalizeEmail(),
  check('phone')
    .isLength(11)
    .withMessage('Пожалуйста, введите правильный мобильный телефон')
    .isMobilePhone(),
  check('password')
    .isLength({ min: 8, max: 100 })
    .withMessage('Пароль должен иметь не менее 8 символов'),
  check('confirmpassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Пароли не соответствуют')
      }
      return true
    })
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    // return res.status(422).jsonp(errors.array())
    const alert = errors.array()
    res.render(/* email: req.body.email, */ 'registration', {
      alert
    })
  } else config.createQuery(req)
})

app.get('/login', function (req, res) {
  return res.render('login')
})

app.post('/login', async function (req, res) {
  // await config.createQuery1(req)
  const user = {
    email: req.body.email,
    password: req.body.password
  }

  return res.send(user)
})

app.get('/getCustomerName', function (req, res) {
  // const result = pool.init('SELECT * FROM product WHERE id = 2')
  // console.log(typeof result)
  // const result = pool.init('SELECT * FROM product WHERE id = 2')
  return res.send(result)
})

// module.exports = app
app.listen(port, function (err) {
  if (err) { console.log(err) }
  console.log('Server running at port 3000')
})
