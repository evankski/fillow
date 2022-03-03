

const express = require('express') // import express
const app = express() // create an express instance
const ejsLayouts = require('express-ejs-layouts') // import ejs layouts
require('dotenv').config() // allows us to access env vars
const cookieParser = require('cookie-parser')
const cryptoJS = require('crypto-js')
const db = require('./models')
const mapboxgl = require('mapbox-gl')
const mapboxSdk = require('@mapbox/mapbox-sdk/services/geocoding')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const geocodingClient = mbxGeocoding( { accessToken: process.env.MAPBOX_TOKEN })
// const forwardGeocode = require('@mapbox/mapbox-sdk/services/geocoding')

// MIDDLEWARE
app.set ('view engine', 'ejs') // set the view engine to ejs
app.use("/public", express.static("public"))
app.use(ejsLayouts) // tell express we want to use layouts
app.use(cookieParser()) // gives us access to req.cookies
app.use(express.urlencoded({extended:false})) //body parser to make req.body work

// CUSTOM LOGIN MIDDLEWARE
app.use(async (req,res, next) =>{
    if(req.cookies.userId) {

        // decrypting the incoming user id from the cookie
        const decryptedId = cryptoJS.AES.decrypt(req.cookies.userId, process.env.SECRET)
        // converting the decrypted id into a readable string
        const decryptedIdString = decryptedId.toString(cryptoJS.enc.Utf8)
        // querying the db for the user with that id
        const user = await db.user.findByPk(decryptedIdString) // find by primary key -- findByPk
        // assigning the found user to res.locals.user in the routes, and user in the ejs
        res.locals.user = user 
    } else res.locals.user = null
    next() // moves onto next middleware OR says 'im done doing things'
})


// CONTROLLERS - goes above any routes
app.use('/users', require('./controllers/users.js'))
app.use('/listings', require('./controllers/listings.js'))


app.get('/', async (req, res) => {
    const listings = await db.listings.findAll()
    res.render('home.ejs',{listings: listings})
    })
    
    const PORT = process.env.PORT || 8000
    app.listen(PORT, () => {
    console.log(`Auth app running on ${PORT}`)
})



// const express = require('express') // import express
// const app = express() // create an instance of express
// const ejsLayouts = require('express-ejs-layouts') // import ejs layouts
// const db = require('./models')
// require('dotenv').config()
// const cryptojs = require('crypto-js')

// // MIDDLEWARE
// app.set('view engine', 'ejs')
// app.use(ejsLayouts)

// // ROUTES
// app.get('/', (req,res) => {
//     res.render('home.ejs')
// })

// // CONTROLLERS
// app.use('/user', require('./controllers/users.js'))
// app.use('/favorite', require('./controllers/favorites.js'))
// app.use('/listing', require('./controllers/listings.js'))


// const PORT = process.env.port || 8000
// app.listen(PORT, () => {
//     console.log(`running port ${PORT}`)
// })