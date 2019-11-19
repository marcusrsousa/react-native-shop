const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Merchant {
    index: Int
    guid: String
    logo: String
    dateCreated: String
    publishedState: Boolean
    brands: [String]
    name: String
    products: [Product]
    commissionFee: String
    contactEmail: String
    phone: String
    address: String
    publishedDate: String
    publishedBy: User
    companyDescription: String
  }
  type Product {
    brand: String
    id: String
    name: String
    price: Float
    description: String
    color: String
    size: String
    quantity: Int
    image: String
    merchant: Merchant!
  }

  input FilterProduct {
    name: String
    brand: String
    merchantName: String
    minPrice: Float
    maxPrice: Float
    description: String
    color: String
    size: String
  }

  type User {
    userId: String
  }

  input UserInput {
    name: String
    email: String!
    password: String!
  }

  type Query {
    products(filters: FilterProduct, offset: Int!, limit: Int!): [Product!]
    user(user: UserInput!): User
  }
  type Mutation {
    editMerchant(publishedState: Boolean!): Merchant
    addUser(user: UserInput!): User
  }
`;

module.exports = typeDefs;
