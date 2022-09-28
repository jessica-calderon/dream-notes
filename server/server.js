const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require ('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

const {
    ApolloServerPluginLandingPageProductionDefault,
    ApolloServerPluginLandingPageLocalDefault
   } = require('apollo-server-core');


const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        process.env.NODE_ENV === "production"
          ? ApolloServerPluginLandingPageProductionDefault({
              embed: true,
              graphRef: "plaid-gufzoj@current"
            })
          : ApolloServerPluginLandingPageLocalDefault({ embed: true })
     ],
    context: authMiddleware
});


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const startAppolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        })
    })
};

startAppolloServer(typeDefs, resolvers);