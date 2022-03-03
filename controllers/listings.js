const express = require("express");
const router = express.Router();
let db = require("../models");
const mapboxgl = require("mapbox-gl");
const mapboxSdk = require("@mapbox/mapbox-sdk/services/geocoding");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });

router.get("/", (req, res) => {
  res.render("listings/listing.ejs");
});

// POST /listing - creates a new listing
router.post("/", (req, res) => {
  db.listings
    .create({
      userId: req.body.userId,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      price: req.body.price,
      url: req.body.url,
    })
    .then((post) => {
      res.redirect("/");
    })
    .catch((error) => {
      res.status(400).render("main/404");
    });
});

// GET /listings/new - display form for creating new listing
router.get("/new", (req, res) => {
  db.user
    .findAll()
    .then((users) => {
      res.render("listings/new", { users: users });
    })
    .catch((error) => {
      res.status(400).render("main/404");
    });
});

// GET /listings/:id - display a specific listing
router.get("/:id", (req, res) => {
  db.listings
    .findOne({
      where: { id: req.params.id },
      // include: [db.author, db.comments]
    })
    .then((listing) => {
      if (!listing) throw Error();
      console.log(listing.user);
      res.render("listings/show", { listings: listing });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).render("main/404");
    });
// router.get("/:id", (req, res) => {
//   db.listings
//     .findOne({
//       where: { id: req.params.id },
//       // include: [db.author, db.comments]
//     })
//     .then((listing) => {
//       if (!listing) throw Error();
//       console.log(listing.user);
//       res.render("listings/show", { listings: listing });
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(400).render("main/404");
//     });
  // Loads the mapbox api
//   geocodingClient
//     .forwardGeocode({
//       query: "608 summerwood dr, brentwood ca",
//       // autocomplete: false,
//       // limit: 1
//     })
//     .send()
//     .then((response) => {
//       if (
//         !response ||
//         !response.body ||
//         !response.body.features ||
//         !response.body.features.length
//       ) {
//         console.error("Invalid response:");
//         console.error(response);
//         return;
//       }
//       const feature = response.body.features[0];
//       // console.log(feature)
//       res.render("listings/show", {
//           listings: lising,
//         mapkey: process.env.MAPBOX_TOKEN,
//         match: feature,
//       });
//     });
});

module.exports = router;
