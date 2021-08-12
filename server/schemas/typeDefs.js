const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
      _id: ID
      email: String!
      username: String!
      token: String!
    }

    type Event {
      eventId: ID
      title: String!
      description: String!
      date: String
      location: String
    }

    type Query {
      getAllEvents: [Event]
      
      getEvent(id: ID): Event
    }

    input EventInput {
      title: String!
      description: String!
      location: String
      date: String
    }

    input UserInput {
      username: String!
      email: String!
      password: String!
    }

    type Mutation {
      createEvent(event: EventInput): Event
      createUser(user: UserInput): User
      login(username: String!, password: String!): User
    }
`

module.exports = typeDefs;
