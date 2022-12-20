const { makeExecutableSchema } = require('apollo-server-express');
const { resolvers } = require('../resolvers/resolvers');
const { typesDefs } = require('../typeDefs/typeDefs');
module.exports = makeExecutableSchema({
	typeDefs: [typesDefs],
	resolvers: resolvers
});