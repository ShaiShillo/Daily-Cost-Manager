//Roman Agbyev ID: 322002098, Shai Shillo ID: 204684914
const express = require(`express`);
const router = express.Router();
const aboutController = require(`../controllers/about_controller`);

// Route for getting information about the developers
router.get(`/about`, aboutController.getDevelopers);

module.exports = router;