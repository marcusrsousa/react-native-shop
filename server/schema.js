const { gql } = require('apollo-server-express');

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
    belongsToBrand: Int
    id: String
    name: String
    price: Float
    description: String
    color: String
    size: String
    quantity: Int
    image: String
  }

  input FilterProduct {
    name: String
    price: Float
    description: String
    color: String
    size: String
  }

  type User {
    userId: String
  }
  type Query {
    products(filters: FilterProduct, offset: Int!, limit: Int!): [Product!]
  }
  type Mutation {
    editMerchant(publishedState: Boolean!): Merchant
  }
`;

module.exports = typeDefs;