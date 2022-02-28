const express = require('express')
const router = express.Router()
const db = require('../models')



router.get('/', (req,res) => {
    res.render('user/user.ejs')
})

router.get('/profile', (req,res) => {
    res.render('user/profile.ejs')
})

router.get('/new', (req,res) => {
    res.render('user/new.ejs')
})

module.exports = router