const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
      id: ID
      email: String!
      username: String!
      token: String!
      event: [Event]
    }

    type Event {
      id: ID
      title: String!
      description: String!
      date: String
      location: String
      createdAt: String
      username: String
    }

    type getEvent {
      eventDetails: Event
      userDetails: User
    }

    type Query {
      getAllEvents: [Event]
      getEvent(eventId: ID): Event
    }

    type Auth {
      token: ID
      user: User
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
      deleteEvent(id: ID): String!
      createUser(user: UserInput): User
      login(email: String!, password: String!): Auth
    }
`

module.exports = typeDefs;
