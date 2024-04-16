const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/").get(wrapAsync(listingController.index)).post(
  isLoggedIn,
  upload.single("listing[image]"),
  validateListing,

  wrapAsync(listingController.createListing)
);

/////////////Search Route///////////////////////////////////////////////////////////////////

router.post(
  "/search",
  wrapAsync(async (req, res) => {
    let search = req.body.search;
    let searchText = search.toLowerCase();
    const allListings = await Listing.find({});
    let matchingListing = allListings.filter((el) => {
      if (el.country.toLowerCase().includes(searchText)) {
        return el;
      }
      if (el.title.toLowerCase().includes(searchText)) {
        return el;
      }
      if (el.location.toLowerCase().includes(searchText)) {
        return el;
      } else if (typeof parseInt(searchText) == "number") {
        if (el.price > parseInt(searchText)) {
          return el;
        }
      }
    });

    res.render("listings/search.ejs", { matchingListing, allListings });
  })
);
///////////////filter route/////////////////////////////////////////////////////////////////
//1 --> /listings/Boats
router.get(
  "/Boats",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    let matchingListing = allListings.filter((el) => el.category === "Boats");
    res.render("listings/index.ejs", { matchingListing });
  })
);

//2 --> /listings/Domes
router.get(
  "/Domes",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    let matchingListing = allListings.filter((el) => el.category === "Domes");
    res.render("listings/index.ejs", { matchingListing });
  })
);

//3 --> /listings/Arctic
router.get(
  "/Arctic",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    let matchingListing = allListings.filter((el) => el.category === "Arctic");
    res.render("listings/index.ejs", { matchingListing });
  })
);

//4 --> /listings/Farms
router.get(
  "/Farms",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    let matchingListing = allListings.filter((el) => el.category === "Farms");
    res.render("listings/index.ejs", { matchingListing });
  })
);

//5 --> /listings/Camping
router.get(
  "/Camping",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    let matchingListing = allListings.filter((el) => el.category === "Camping");
    res.render("listings/index.ejs", { matchingListing });
  })
);

//6 --> /listings/AmazingPools
router.get(
  "/AmazingPools",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    let matchingListing = allListings.filter(
      (el) => el.category === "Amazing Pools"
    );
    res.render("listings/index.ejs", { matchingListing });
  })
);

//7 --> /listings/Beach
router.get(
  "/Beach",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    let matchingListing = allListings.filter((el) => el.category === "Beach");
    res.render("listings/index.ejs", { matchingListing });
  })
);

//8 --> /listings/Mountains
router.get(
  "/Mountains",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    let matchingListing = allListings.filter(
      (el) => el.category === "Mountains"
    );
    res.render("listings/index.ejs", { matchingListing });
  })
);

//9 --> /listings/IconicCities
router.get(
  "/IconicCities",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    let matchingListing = allListings.filter(
      (el) => el.category === "Iconic cities"
    );
    res.render("listings/index.ejs", { matchingListing });
  })
);

//10 --> /listings/Villas
router.get(
  "/Villas",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    let matchingListing = allListings.filter((el) => el.category === "Villas");
    res.render("listings/index.ejs", { matchingListing });
  })
);
///////////////New Route////////////////////
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    isLoggedIn,
    isOwner,

    wrapAsync(listingController.destroyListing)
  );

////////////Edit Route/////////////////
router.get(
  "/:id/edit",
  isLoggedIn,
  upload.single("listing[image]"),
  isOwner,

  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
