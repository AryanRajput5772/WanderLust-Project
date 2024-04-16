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
  wrapAsync(listingController.searchRoute );

    
  
);
///////////////filter route/////////////////////////////////////////////////////////////////
//1 --> /listings/Boats
router.get(
  "/Boats",
  wrapAsync(listingController.Boats
);

//2 --> /listings/Domes
router.get(
  "/Domes",
  wrapAsync(listingController.Domes
);

//3 --> /listings/Arctic
router.get(
  "/Arctic",
  wrapAsync(listingController.Arctic
);

//4 --> /listings/Farms
router.get(
  "/Farms",
  wrapAsync(listingController.Farms
);

//5 --> /listings/Camping
router.get(
  "/Camping",
  wrapAsync(listingController.Camping
);

//6 --> /listings/AmazingPools
router.get(
  "/AmazingPools",
  wrapAsync(listingController.AmazingPools
);

//7 --> /listings/Beach
router.get(
  "/Beach",
  wrapAsync(listingController.Beach
);

//8 --> /listings/Mountains
router.get(
  "/Mountains",
  wrapAsync(listingController.Mountains
);

//9 --> /listings/IconicCities
router.get(
  "/IconicCities",
  wrapAsync(listingController.IconicCities
);

//10 --> /listings/Villas
router.get(
  "/Villas",
  wrapAsync(listingController.Villas
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
