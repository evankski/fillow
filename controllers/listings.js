const express = require('express')
const router = express.Router()
let db = require('../models')



router.get('/', (req,res) => {
    res.render('listings/listing.ejs')
})

// POST /listing - creates a new listing
router.post('/', (req,res) => {
    db.listings.create({
        userId: req.body.userId,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        price: req.body.price,
        url: req.body.url
    })
    .then((post) => {
        res.redirect('/')
    })
    .catch((error) => {
        res.status(400).render('main/404')
    })
})

// GET /listings/new - display form for creating new listing
router.get('/new', (req,res)=> {
    db.user.findAll()
    .then((users) => {
        res.render('listings/new', { users: users})
    })
    .catch((error) => {
        res.status(400).render('main/404')
    })
})

// GET /listings/:id - display a specific listing and its author
router.get('/:id', (req,res) => {
    db.listings.findOne({
        where: {id: req.params.id},
        include: [db.author, db.comments]
    })
    .then((listing) => {
        if (!listing) throw Error()
        console.log(listing.user)
        res.render('listing/show', {listing: listing})
    })
    .catch((error) => {
        console.log(error)
        res.status(400).render('main/404')
    })
})

module.exports = router