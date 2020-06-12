const { GraphQLSchema } = require('graphql')
const RootQuery = require("./RootQuery");
const RootMutation = require("./RootMutation");

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})

module.exports = schema;