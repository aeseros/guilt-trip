const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');
const  { typeDefs, resolvers } = require('./schemas');

dotenv.config();

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

    // got rid of cors access error
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
     })

    if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    }

    app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`);
        });
    });

};

startServer();
