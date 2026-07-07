const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing.js");
const {isLoggedIn} = require("../middleware.js");
const {isOwner} = require("../middleware.js");
const {validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

// Index route and create route es code router.route ka matlab yen h ki do http metod get aur  post ko ek sath define kar sakta h.
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, upload.single('listing[image][url]'), validateListing, wrapAsync(listingController.createListing));

router.get("/category/:category", wrapAsync(async (req, res) => {
    const { category } = req.params;

    const allListings = await Listing.find({ category });

    res.render("listings/index.ejs", { allListings });
}));


// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// show route aur put route and delete route
router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put( isLoggedIn,isOwner, upload.single('listing[image][url]'), validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner,wrapAsync(listingController.destroyListing));


// Edit route
router.get("/:id/edit",  isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));



module.exports = router;