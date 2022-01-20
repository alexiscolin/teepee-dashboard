require("localenv");
const jsonwebtoken = require("jsonwebtoken");

const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { schema, resolvers } = require("./schema");

const { JWT_SECRET, PORT } = process.env;

mongoose
  .connect("mongodb://user:pswd@db:27017/teepee", { useNewUrlParser: true })
  .then(() => {
    console.log("Mongodb connected..");
  })
  .catch((err) => console.log(err));

const getUser = (token) => {
  try {
    if (token) {
      return jsonwebtoken.verify(token, JWT_SECRET);
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  context: ({ req }) => {
    const token = req.get("Authorization") || "";
    return { user: getUser(token.replace("Bearer ", "")) };
  },
  playground: process.env.NODE_ENV !== "production",
  introspection: process.env.NODE_ENV !== "production",
  formatError: (err) => {
    // Don't give the specific errors to the client
    if (err.message.startsWith("Database Error: ")) {
      return new Error("Internal server error");
    }
    // Otherwise return the original error
    return err;
  },
});

server.listen(3000).then(({ url }) => {
  console.log("API server running at localhost:3000");
  console.log(url);
});
