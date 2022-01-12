require('localenv')

const { ApolloServer } = require('apollo-server');
const mongoose = require("mongoose");
const { schema, resolvers} = require('./schema');

mongoose
  .connect("mongodb://user:pswd@db:27017/teepee",{useNewUrlParser: true})
  .then(() => {
    console.log("Mongodb connected..");
  })
  .catch((err) => console.log(err));


const server = new ApolloServer({ 
    typeDefs: schema,
    resolvers: resolvers,
    introspection: process.env.NODE_ENV !== 'production',
    formatError: (err) => {
      // Don't give the specific errors to the client
      if (err.message.startsWith('Database Error: ')) {
        return new Error('Internal server error');
      }
      // Otherwise return the original error
      return err;
    },
  }); 
  
  server.listen(3000).then(({ url }) => {
    console.log('API server running at localhost:3000');
  });
