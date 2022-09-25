const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    dreams: [Dream]
    friends: [User]
  }
  type Dream {
    _id: ID
    dreamText: String
    createdAt: String
    username: String
    commentCount: Int
    comments: [Comment]
  }
  type Comment {
    _id: ID
    commentBody: String
    createdAt: String
    username: String
  }
  type Query {
    me: User
    users: [User]
    user(username: String!): User
    dreams(username: String): [Dream]
    dream(_id: ID!): Dream
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addDream(dreamText: String!): Dream
    addComment(dreamId: ID!, commentBody: String!): Dream
    addFriend(friendId: ID!): User
  }
  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
