const faker = require("faker");
const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const User = require("./src/models/user");
const Market = require("./src/models/market");

faker.locale = "fr";

const createmMarketData = id => {
    const marketData = [];
    const marketCount = 200;
    const providers = ["SeLoger", "Meilleurs Agents", "Afficity"]
    for (let i = 0; i < marketCount; i++) {
        marketData.push({
            user: id,
            provider: providers[Math.floor(Math.random()*providers.length)],
            timestamp: faker.datatype.datetime(),
            location: "Versailles",
            date: faker.date.between(DateTime.now().minus({year: 1}).toISODate(), DateTime.now().toISODate()),
            price: faker.datatype.number({min: 1000, max: 15000}),
            region_rate: faker.datatype.float({min: 1, max: 20}),
            properties_on_market: faker.datatype.number({min: 0, max: 1000}),
            rent: faker.datatype.float({min: 1, max: 45}),
            sales_time: faker.datatype.number({min: 1, max: 250}),
        })
    }

    return marketData;
}

const createUserData = () => {
    const userData = [];
    const userCount = 1;

    for (let i = 0; i < userCount; i++) {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const email = faker.internet.email(firstName, lastName);
        const property = {
            location: faker.address.streetAddress(),
            zipcode: faker.address.zipCode(),
            city: "Versailles",
            property_size: faker.datatype.number({min: 10, max: 300})
        };

        const propertyPrice = faker.datatype.number({min: 1000, max: 15000});
        const purchase = {
            property_price: propertyPrice,
            estate_agent_cost: faker.datatype.float({min: 1000, max: propertyPrice}),
            notary_cost: faker.datatype.float({min: 1000, max: propertyPrice}),
            renovation_work_cost: faker.datatype.float({min: 1000, max: propertyPrice})
        };

        const loan = {
            loan_amount: faker.datatype.number({min: 1000, max: purchase.property_price + purchase.estate_agent_cost + purchase.notary_cost + purchase.renovation_work_cost}),
            interet_rate: faker.datatype.float({min: 0.01, max: 10}),
            duration: faker.datatype.number({min: 1, max: 300}),
            purchasing_date: faker.datatype.datetime()
        }
        
        userData.push({
            firstName,
            lastName,
            email,
            property,
            purchase,
            loan
        });
    }

    return userData;
}

async function seeding () {
    try {
        const users = await User.insertMany(createUserData());
        const usersId = users.map((o) => o._id);

        const snaps = await Market.insertMany(createmMarketData(usersId));
        console.log(`Inserted ${snaps.length} markets snapshots`);
    } catch (error) {
        console.log(error) 
    }
}

// seed init

mongoose
    .connect("mongodb://user:pswd@db:27017/teepee",{useNewUrlParser: true})
    .then(() => {
        console.log("Seeding connected to Mongodb");
        seeding();
    })
    .catch((err) => console.log(err));


module.exports = seeding;