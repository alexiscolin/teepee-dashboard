const { DateTime } = require("luxon");

const MarketModel = require("../models/market");

// Get all markets
exports.getMarketSnapshots = async (
  { userId, provider, startDate, endDate },
  context
) => {
  try {
    const query = {
      userId, // mandatory
      ...(provider && { provider }), // add or not the query in mongo query
      date: {
        // defaut 1 year before today
        $gte: new Date(
          startDate || DateTime.now().minus({ year: 1 }).toISODate()
        ),
        $lt: new Date(endDate || DateTime.now().toISODate()),
      },
    };

    const result = await MarketModel.find(query);
    return result;
  } catch (error) {
    throw console.log(error);
  }
};
