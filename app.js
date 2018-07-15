const express = require('express')
const routes = require('./routes/index')
const path = require('path')
const bodyParser = require('body-parser')
const hbs = require('hbs')

// create our Express app
const app = express()

app.set('views', path.join(__dirname, 'views')) // this is the folder where I keep our hbs files
app.set('view engine', 'hbs')

// tells the app where the partials are located
hbs.registerPartials(path.join(__dirname, '/views/partials'))
hbs.registerPartials(path.join(__dirname, '/views/pages'))

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')))

// Body parser allows us to use req.body as a usable property
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Splits the code to make it look cleaner
app.use('/', routes)

module.exports = app
