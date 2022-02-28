const express = require('express') // import express
const app = express() // create an instance of express
const ejsLayouts = require('express-ejs-layouts') // import ejs layouts
// const db = require('./models')

// MIDDLEWARE
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// ROUTES
app.get('/', (req,res) => {
    res.send('testing')
})

// CONTROLLERS
app.use('/user', require('./controllers/user.js'))
app.use('/favorite', require('./controllers/favorite.js'))
app.use('/listing', require('./controllers/listing.js'))


const PORT = process.env.port || 8000
app.listen(PORT, () => {
    console.log(`running port ${PORT}`)
})