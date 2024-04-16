const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  const matchingListing = await Listing.find({});
  res.render("./listings/index.ejs", { matchingListing });
};

module.exports.searchRoute = async (req, res) => {
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

module.exports.Boats = async (req, res) => {
    const allListings = await Listing.find({});
    let matchingListing = allListings.filter((el) => el.category === "Boats");
    res.render("listings/index.ejs", { matchingListing });
  })

module.exports.Domes = async (req, res) => {
    const allListings = await Listing.find({});
    let matchingListing = allListings.filter((el) => el.category === "Domes");
    res.render("listings/index.ejs", { matchingListing });
  })

module.exports.Arctic = async (req, res) => {
    const allListings = await Listing.find({});
    let matchingListing = allListings.filter((el) => el.category === "Arctic");
    res.render("listings/index.ejs", { matchingListing });
  })

module.exports.Farms = async (req, res) => {
    const allListings = await Listing.find({});
    let matchingListing = allListings.filter((el) => el.category === "Farms");
    res.render("listings/index.ejs", { matchingListing });
  })

module.exports.Camping = async (req, res) => {
    const allListings = await Listing.find({});
    let matchingListing = allListings.filter((el) => el.category === "Camping");
    res.render("listings/index.ejs", { matchingListing });
  })

module.exports.AmazingPools = async (req, res) => {
    const allListings = await Listing.find({});
    let matchingListing = allListings.filter((el) => el.category === "Amazing Pools");
    res.render("listings/index.ejs", { matchingListing });
  })

module.exports.Beach = async (req, res) => {
    const allListings = await Listing.find({});
    let matchingListing = allListings.filter((el) => el.category === "Beach");
    res.render("listings/index.ejs", { matchingListing });
  })

module.exports.Mountains = async (req, res) => {
    const allListings = await Listing.find({});
    let matchingListing = allListings.filter((el) => el.category === "Mountains");
    res.render("listings/index.ejs", { matchingListing });
  })

module.exports.IconicCities = async (req, res) => {
    const allListings = await Listing.find({});
    let matchingListing = allListings.filter((el) => el.category === "Iconic cities");
    res.render("listings/index.ejs", { matchingListing });
  })

module.exports.Villas = async (req, res) => {
    const allListings = await Listing.find({});
    let matchingListing = allListings.filter((el) => el.category === "Villas");
    res.render("listings/index.ejs", { matchingListing });
  })




module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", " Listing you requested for does not exist!");
    res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = response.body.features[0].geometry;
  let savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", " Listing you requested for does not exist!");
    res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", " Listing Updated!");

  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted!");

  res.redirect("/listings");
};
