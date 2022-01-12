const mongoose = require('mongoose');

const schema = mongoose.Schema({
    provider: { 
        // Website recorded
        type: String, 
        required: true 
    },
    user: {
        // User logged to this account
        type: mongoose.ObjectId, 
        required: true 
    },
    timestamp: { 
        // Date and time of the scraping
        type: Date, 
        default: Date.now()
    },
    location: { 
        // The location data that has been scraped
        type: String, 
        required: true 
    },
    // Dataset of information scraped
    date: {
        // Referred time of the data
        type: Date, 
        required: true 
    },
    price: {
        // Price per square meter in the city
        type: Number,
        required: true,
        min: 0,
    },
    region_rate: {
        //Regional real estate rate
        type : Number
    },
    properties_on_market: {
        // Amount of properties on the market in the city
        "type": Number
    },
    rent: {
        // Average Rental fee for a square meter in the city
        "type": Number,
    },
    sales_time: {
        // How many days do you need to sell your property
        "type": Number,
    }
});

module.exports = mongoose.model('Market', schema);