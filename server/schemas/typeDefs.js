const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        events: [Event]
    }

    type Event {
        eventId: ID
        title: String!
        description: String!
        location: Location
        date: Date!
    }

    type Location {
        name: String!
        city: String
        country: String
    }

    type Query {
        getAllEvents: [Event]
    }

    input EventInput {
        title: String!
        description: String!
        location: Location
        date: Date!
    }

    type Mutation {
        createEvent(event: EventInput): Event
    }
`

module.exports = typeDefs;