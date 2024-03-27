//Roman Agbyev ID: 322002098, Shai Shillo ID: 204684914
const express = require(`express`);
const router = express.Router();
const reportController = require(`../controllers/report_controller`);

router.get(`/report`, reportController.getReport);

module.exports = router;