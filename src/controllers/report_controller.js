//Roman Agbyev ID: 322002098, Shai Shillo ID: 204684914
const Cost = require(`../models/cost`);
const User = require(`../models/user`);
const CustomException = require(`../utils/CustomException`);

//Controller to handle the report get request
exports.getReport = async (req, res) => {
    try{
        //Recieved params
        const { user_id, year, month } = req.query;

        //Validate no missing params
        if (!user_id || !year || !month) {
            throw new CustomException(`Missing required parameters`, 400);
        }

        //Parsed to Int for type validation
        const parsed_user_id = parseInt(user_id);
        const parsed_year = parseInt(year);
        const parsed_month = parseInt(month);

        //Validate params type
        if (isNaN(parsed_user_id) || isNaN(parsed_year) || isNaN(parsed_month)) {
            throw new CustomException(`Invalid parameter types`, 400);
        }

        //Check if the user exists
        const user = await User.findOne({ id: user_id });
        if (!user) {
            throw new CustomException(`User not found`, 404);
        }

        //Query the db for the report
        const report = await Cost.find({ user_id, year, month }).select(`-_id day description sum category`);

        //Create the report structure
        const allCategories = [`food`, `health`, `housing`, `sport`, `education`, `transportation`, `other`];
        const groupedReport = allCategories.reduce((acc, category) => {
            acc[category] = [];
            return acc;
        }, {});

        //Put the relevant cost items in the report
        report.forEach(item => {
            groupedReport[item.category].push({
                day: item.day,
                description: item.description,
                sum: item.sum
            });
        });

        //Resolve with the report
        res.status(200).json(groupedReport);

    } catch (err) {
        //Handle possible exceptions
        if (err instanceof CustomException) {
            res.status(err.status).json({ error: err.message });
        } else {
            console.error(`Unhandled error:`, err);
            res.status(500).json({ error: `Internal Server Error` });
        }
    }
};