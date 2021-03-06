const { gql } = require("apollo-server");

const userController = require("../controllers/userController");
const marketController = require("../controllers/marketController");

const schema = gql`
  type Query {
    currentUser(id: ID!): User
    marketSnapshots(
      userId: ID!
      provider: ProvidersList
      startDate: String
      endDate: String
    ): [MarketSnaphot] #if provider null -> fetch all provider
  }

  type Mutation {
    createUser(
      username: String
      email: String!
      password: String!
    ): AuthPayload!
    loginUser(email: String!, password: String!): AuthPayload!
  }

  type User {
    id: ID!
    username: String
    password: String
    role: String
    property: Property
    purchase: Purchase
    loan: Loan
    marketSnapshots(provider: ProvidersList): [MarketSnaphot]
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type MarketSnaphot {
    id: ID!
    user: ID!
    provider: ProvidersList
    timestamp: String
    location: String
    date: String
    price: Float
    region_rate: Float
    properties_on_market: Int
    rent: Float
    sales_time: Int
  }

  enum ProvidersList {
    SELOGER
    AFFICITY
    MEILLEURS_AGENTS
  }

  type Property {
    location: String
    zipcode: Int
    city: String
    property_size: Float
  }

  type Purchase {
    property_price: Float
    estate_agent_cost: Float
    notary_cost: Float
    renovation_work_cost: Float
  }

  type Loan {
    loan_amount: Float
    interet_rate: Float
    duration: Int
    purchasing_date: String
  }

  type Provider {
    id: ID!
    status: Boolean!
    marketSnapshots: [MarketSnaphot]
  }
`;

// Define the resolvers
const resolvers = {
  // compile Public API -> to private API in DB
  ProvidersList: {
    SELOGER: "SeLoger",
    AFFICITY: "Afficity",
    MEILLEURS_AGENTS: "Meilleurs Agents",
  },

  Query: {
    currentUser: async (_, { id }, context) => {
      const user = await userController.getCurrentuser(_, { id }, context);
      return user;
    },

    marketSnapshots: async (
      _,
      { userId, provider, startDate, endDate },
      context
    ) => {
      const marketSnapshots = await marketController.getMarketSnapshots(
        {
          userId,
          provider,
          startDate,
          endDate,
        },
        context
      );
      return marketSnapshots;
    },
  },

  Mutation: {
    createUser: async (_, { username, email, password }) => {
      const createUser = await userController.createUser(_, {
        username,
        email,
        password,
      });
      return createUser;
    },

    loginUser: async (_, { email, password }) => {
      const loginUser = await userController.loginUser(_, { email, password });
      return loginUser;
    },
  },

  User: {
    marketSnapshots: async (parent, args) => {
      let marketSnapshots = await marketController.getMarketSnapshots({
        ...parent,
        ...args,
      });
      return marketSnapshots;
    },
  },
};

module.exports = { schema, resolvers };
