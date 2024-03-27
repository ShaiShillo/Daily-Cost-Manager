//Roman Agbyev ID: 322002098, Shai Shillo ID: 204684914
const Cost = require(`../models/cost`);
const User = require(`../models/user`);
const CustomException = require(`../utils/CustomException`);

//Controller to handle the addcost post request
exports.addCost = async (req, res) => {
  try {
      //Recieved params
      const { user_id, description, category, sum, year, month, day } = req.body;

      //Validate no missing params
      if (!user_id || !description || !category || !sum || (!year && !month && !day)) {
          throw new CustomException(`Missing required parameters`, 400);
      }

      //Parse the numbers to Int to validate type
      const parsed_user_id = parseInt(user_id);
      const parsed_year = parseInt(year);
      const parsed_month = parseInt(month);
      const parsed_day = parseInt(day);
      const parsed_sum = parseInt(sum);

      //Validate params type and 'legal' values for category and description (assumed not empty)
      if (isNaN(parsed_user_id) || isNaN(parsed_year) || isNaN(parsed_month) ||
          isNaN(parsed_day) || typeof description !== `string` || typeof category !== `string` ||
          isNaN(parsed_sum) || description.trim() === `` ||
          ![`food`, `health`, `housing`, `sport`, `education`, `transportation`, `other`].includes(category)){
          throw new CustomException(`Invalid parameter types or values`, 400);
      }

      //Check if the user exists
      const user = await User.findOne({ id: user_id });
      if (!user) {
          throw new CustomException(`User not found`, 404);
      }

      //Set values for year, month, and day if not provided
      const currentDate = new Date();
      const currentYear = year || currentDate.getFullYear();
      const currentMonth = month || currentDate.getMonth() + 1; // Month is 0-indexed
      const currentDay = day || currentDate.getDate();

      //Create a cost item
      const newCost = new Cost({
          user_id,
          description,
          category,
          sum,
          year: currentYear,
          month: currentMonth,
          day: currentDay
      });

      //Save to the db
      await newCost.save();

      //Resolve with success
      res.status(201).json({ message : `Cost item added successfully`});

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