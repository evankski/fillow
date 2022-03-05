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
  db.listing
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
  const user = res.locals.user;
  db.user
    .findAll()
    .then((users) => {
      res.render("listings/new", { users: users, user: user });
    })
    .catch((error) => {
      res.status(400).render("main/404");
    });
});

// GET /listings/:id - display a specific listing
router.get("/:id", async (req, res) => {
  const user = res.locals.user;
  const comment = await db.comment.findAll({
    where: { listingId: req.params.id },
  });
  db.listing
    .findOne({
      where: { id: req.params.id },
      // include: [db.author, db.comments]
    })
    .then((listing) => {
      if (!listing) throw Error();
      geocodingClient
        .forwardGeocode({
          query: `${listing.address} ${listing.city}, ${listing.state}`,
          // autocomplete: false,
          // limit: 1
        })
        .send()
        .then((response) => {
          if (
            !response ||
            !response.body ||
            !response.body.features ||
            !response.body.features.length
          ) {
            console.error("Invalid response:");
            console.error(response);
            return;
          }
          const feature = response.body.features[0];
          // console.log(feature)
          comment.forEach(async (element, i) => {
            comment[i].user = await db.user.findOne({
              where: { id: element.userId },
            });
          });
          res.render("listings/show", {
            listing: listing,
            mapkey: process.env.MAPBOX_TOKEN,
            match: feature,
            user: user,
            comment: comment,
          });
        });
      //   console.log(listing.user);
      //   res.render("listings/show", { listings: listing });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).render("main/404");
    });
});

router.put("/edit/:id", async (req, res) => {
  try {
    const foundListing = await db.listing.findOne({
      where: {
        // userId: res.locals.user.id,
        id: req.params.id,
      },
    });
    foundListing.update({
      userId: req.body.userId,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      price: req.body.price,
      url: req.body.url,
    });
    await foundListing.save();
    res.redirect("/");
  } catch (err) {
    console.log("err", err);
  }
});
router.get("/edit/:id", async (req, res) => {
  res.render("listings/edit.ejs", { listingId: req.params.id});
});

router.delete("/:id", async (req, res) => {
  try {
    const foundListing = await db.listing.findOne({
      where: { id: req.params.id },
    });
    await foundListing.destroy();
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

router.post("/comments", (req, res) => {
  db.comment
    .create({
      listingId: req.body.listingId,
      userId: req.body.userId,
      email: req.body.email,
      content: req.body.content,
    })
    .then((post) => {
      res.redirect("/");
    })
    .catch((error) => {
      res.status(400).render("main/404");
    });
});

// GET /faves -- READ all faves from the database
// router.get('/', async (req, res) => {
//   try {
//     const allFaves = await db.users_listings.findAll()
//     res.json(allFaves)
//   } catch (err) {
//     console.log(err)
//   }
// })

module.exports = router;
