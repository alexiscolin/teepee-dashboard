const mongoose = require('mongoose');

const schema = mongoose.Schema({
    firstName: { 
        type: String, 
        default: "Alexis" 
    },
    lastName: { 
        type: String, 
        default: "Colin" 
    },
    email: { 
        type: String, 
    }, 
    property: { 
        // information about the property itself
        location: {
            // where the property is located
            type: String,
            required: true
        },
        zipcode: {
            // property location zipcode
            type: Number,
            required: true,
            match: [/^(?:[0-8]\d|9[0-8])\d{3}$/, 'Please fill a correct zipcode']
        },
        city: {
            // city where the proporty is located
            type: String,
            required: true
        },
        property_size: {
            // surface of the property (m2)
            type: Number,
            required: true,
            min: 0
        }
    },
    purchase: { 
        // Cost repartition
        property_price: {
            // price of the property
            type: Number,
            required: true,
            min: 0
        },
        estate_agent_cost: {
            // price of the estate agent
            type: Number,
            required: true,
            min: 0
        },
        notary_cost: {
            // price of the notary agent
            type: Number,
            required: true,
            min: 0
        },
        renovation_work_cost: {
            // price of the renovation works
            type: Number,
            required: true,
            min: 0
        }
    },
    loan: { 
        // information about the loan 
        loan_amount: {
            // Amount in euro
            type: Number, 
            min: 0 
        },
        interet_rate: {
            // rate
            type: Number,
            min: 0,
        },
        duration: {
            // Loan duration in month
            type : Number,
            min: 0
        },
        purchasing_date: {
            // When have you bought the property
            "type": Date,
            required: true
        }
    },
    // city to compate
    comparison_city: [String]
});

module.exports = mongoose.model('User', schema);