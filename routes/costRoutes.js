const Cost = require('../models/cost');


// addcost endpoint:
const express = require('express');
const router = express.Router();


// Add a new cost item
router.post('/addcost/', async (req, res) => {
  try {
    const newCost = new Cost(req.body);
    await newCost.save();
    res.status(201).json(newCost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//report endpoint: Get a detailed report for a specific month and year for a user
router.get('/report/', async (req, res) => {
    const { user_id, year, month } = req.query;
    try {
        const costs = await Cost.find({ user_id, year, month });
        const categorizedCosts = costs.reduce((acc, cost) => {
            // Initialize category array if it does not exist
            if (!acc[cost.category]) acc[cost.category] = [];
            acc[cost.category].push({
                day: cost.day,
                description: cost.description,
                sum: cost.sum
            });
            return acc;
        }, {
            food: [], health: [], housing: [], sport: [], education: [], transportation: [], other: []
        });

        res.json(categorizedCosts);
    } catch (err) {
        res.status(500).json({ message: "Error fetching report: " + err.message });
    }
});

//about endpoint: Get information about the developers
router.get('/about/', (req, res) => {
    const developers = [
        { firstname: "Yarin", lastname: "Ben-Moshe", id:  314939885, email: "yarinbenmoshe@gmail.com" },
        { firstname: "Roman", lastname: "Agbyev", id: 322002098, email: "romanagbyev@gmail.com" },
        { firstname: "Shai", lastname: "Shillo", id: 204684914, email: "shaishillo@gmail.com" }
        // Add more developers as needed
    ];

    res.json(developers);
});

module.exports = router;

