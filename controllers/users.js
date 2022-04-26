const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const cryptojs = require("crypto-js");
require("dotenv").config();

router.get("/profile", async (req, res) => {
  try {
    // const users_listings = await db.users_listings.findAll()
    const users_listings = await res.locals.user.getListings();
    // console.log(users_listings)
    res.render("users/profile.ejs", { users_listings: users_listings });
  } catch (error) {
    console.log(error);
  }
});

router.get("/new", (req, res) => {
  res.render("users/new.ejs");
});

// Creates a new user/email and password and puts it into the database with encrypted pass
router.post("/", async (req, res) => {
  const [newUser, created] = await db.user.findOrCreate({
    where: { email: req.body.email },
  });
  if (!created) {
    console.log("User already exists");
    // render the login page and send an appropriate message
  } else {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    newUser.password = hashedPassword;
    await newUser.save();

    // ecrypt the user id via AES
    // const encryptedUserId = cryptojs.AES.encrypt(user.id.toString(), process.env.SECRET)
    // const encryptedUserIdString = encryptedUserId.toString()
    // console.log(encryptedUserIdString)
    // store the encrypted id in the cookie of the res obj
    // res.cookie('userId', encryptedUserIdString)
    // redirect back to the home page
    res.redirect("/");
  }
});

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post("/login", async (req, res) => {
  const user = await db.user.findOne({ where: { email: req.body.email } });
  if (!user) {
    // also means if user is null or isn't in database
    console.log("user not found!");
    res.render("users/login.ejs", { error: "Invalid email/password" });
  } else if (!bcrypt.compareSync(req.body.password, user.password)) {
    // found user but password was wrong
    console.log("Incorrect Password");
    res.render("users/login.ejs", { error: "Invalid email/password" });
  } else {
    console.log("logging in the user!");
    // ecrypt the user id via AES
    const encryptedUserId = cryptojs.AES.encrypt(
      user.id.toString(),
      process.env.SECRET
    ); // secret string for encrypting
    const encryptedUserIdString = encryptedUserId.toString();
    console.log(encryptedUserIdString);
    // store the encrypted id in the cookie of the res obj
    res.cookie("userId", encryptedUserIdString);
    // redirect back to the home page
    res.redirect("/");
  }
});

router.get("/logout", (req, res) => {
  console.log("logging out");
  res.clearCookie("userId");
  res.redirect("/");
});

// POST /faves -- CREATE a fave and redirect to /faves
router.post("/listings/:id", async (req, res) => {
  // toy = listing
  try {
    const listing = await db.listing.findByPk(req.params.id);

    await res.locals.user.addListing(listing);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }

  // try {
  //   await db.users_listings.create({
  //     userId: res.locals.user,
  //     listingId: req.body.listingId
  //   })

  //   res.redirect(' /')
  // } catch(error) {
  //   console.log(error)
  // }
});
// export all these routes to the entry point file
module.exports = router;
