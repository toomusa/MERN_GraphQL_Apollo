const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } = require('graphql');
const { WorkLogType, JobCardType } = require("./types");
const { WorkLog, JobCard } = require("../models");

const RootQuery = new GraphQLObjectType({
  name: 'Query',
  description: "Root Query",
  fields: () => ({
    allLogs: {
      type: new GraphQLList(WorkLogType),
      description: 'A Single Book',
      resolve: () => {
        return WorkLog.find({});
      }
    },
    logByEmployee: {
      type: new GraphQLList(WorkLogType),
      description: "Get all logs by employee name",
      args: {
        employee: { type: GraphQLString }
      },
      resolve: (parent, args) => {
        return WorkLog.find({ employee: args.employee });
      }
    },
    jobCard: {
      type: new GraphQLList(WorkLogType),
      description: "Get job card by employee name",
      args: {
        employee: { type: GraphQLString }
      },
      resolve: (parent, args) => {
        return JobCard.find({ employee: args.employee });
      }
    }
  })
});

module.exports = RootQuery;