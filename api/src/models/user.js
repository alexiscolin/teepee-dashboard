const mongoose = require("mongoose");

const schema = mongoose.Schema({
  username: {
    type: String,
    default: "AlexisColin",
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
  property: {
    // information about the property itself
    location: {
      // where the property is located
      type: String,
    },
    zipcode: {
      // property location zipcode
      type: Number,
      match: [/^(?:[0-8]\d|9[0-8])\d{3}$/, "Please fill a correct zipcode"],
    },
    city: {
      // city where the proporty is located
      type: String,
    },
    property_size: {
      // surface of the property (m2)
      type: Number,
      min: 0,
    },
  },
  purchase: {
    // Cost repartition
    property_price: {
      // price of the property
      type: Number,
      min: 0,
    },
    estate_agent_cost: {
      // price of the estate agent
      type: Number,
      min: 0,
    },
    notary_cost: {
      // price of the notary agent
      type: Number,
      min: 0,
    },
    renovation_work_cost: {
      // price of the renovation works
      type: Number,
      min: 0,
    },
  },
  loan: {
    // information about the loan
    loan_amount: {
      // Amount in euro
      type: Number,
      min: 0,
    },
    interet_rate: {
      // rate
      type: Number,
      min: 0,
    },
    duration: {
      // Loan duration in month
      type: Number,
      min: 0,
    },
    purchasing_date: {
      // When have you bought the property
      type: Date,
    },
  },
  // city to compate
  comparison_city: [String],
});

module.exports = mongoose.model("User", schema);
