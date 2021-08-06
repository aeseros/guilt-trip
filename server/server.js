const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const  { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

async function startServer() {
    const PORT = process.env.PORT || 5000;
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    app.use((req, res) => {
        res.send('hello from express apollo server! this page says cannot get /')
    });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`listening on http://localhost:${PORT}/`)
        })
    });
};

startServer();