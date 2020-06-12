const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } = require('graphql');
const { WorkLog, JobCard } = require("../models");

const WorkLogType = new GraphQLObjectType({
  name: 'WorkLogType',
  description: 'This represents a Work Log',
  fields: () => ({
    _id: { type: GraphQLString },
    employee: { type: GraphQLString },
    ranch: { type: GraphQLString },
    field: { type: GraphQLString },
    job: { type: GraphQLString },
    logType: { type: GraphQLString },
    startTime: { type: GraphQLString },
    endTime: { type: GraphQLString },
  })
})

const JobCardType = new GraphQLObjectType({
  name: 'JobCardType',
  description: 'This represents a Job Card',
  fields: () => ({
    _id: { type: GraphQLString },
    employee: { type: GraphQLString },
    startTime: { type: GraphQLString },
    endTime: { type: GraphQLString },
    // workLogs: { type: GraphQLList(WorkLogType),
    //   resolve: (jobCard) => {
    //     return WorkLog.find({ employee: jobCard.employee });
    //   }
    // }
  })
})

module.exports = { WorkLogType, JobCardType };