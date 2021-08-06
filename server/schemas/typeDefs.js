const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        events: [Event]
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
        eventId: ID
        title: String!
        description: String!
        location: String
        date: String
    }

    type Mutation {
        createEvent(event: EventInput): Event
    }
`

module.exports = typeDefs;