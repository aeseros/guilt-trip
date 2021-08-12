const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');
const  { typeDefs, resolvers } = require('./schemas');

dotenv.config();

// async function startServer() {
//     const PORT = process.env.PORT || 5000;
//     const app = express();
//     const apolloServer = new ApolloServer({
//         typeDefs,
//         resolvers,
//     });

//     await apolloServer.start();

//     apolloServer.applyMiddleware({ app });
//     app.use(express.urlencoded({ extended: true }));
//     app.use(express.json());

//     // if (process.env.NODE_ENV === 'production') {
//     //     app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

//     app.use((req, res) => {
//         res.send('/')
//     });

//     // app.get('*', (req, res) => {
//     //     res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'))
//     // })

//     db.once('open', () => {
//         app.listen(PORT, () => {
//             console.log(`listening on http://localhost:${PORT}/`)
//         })
//     });
// };

// startServer();

async function startServer() {

    const app = express();
    const PORT = process.env.PORT || 5000;
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // if we're in production, serve client/build as static assets
    if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    }

    app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

    db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        // log where we can go to test our GQL API
        console.log(`Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    });
    });

};

startServer();

