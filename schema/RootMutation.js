const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } = require('graphql');
const { WorkLogType, JobCardType } = require("./types");
const { WorkLog, JobCard } = require("../models");

const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  description: "Root Mutation",
  fields: () => ({
    addLog: {
      type: WorkLogType,
      description: 'Add a Work Log',
      args: {
        employee: { type: GraphQLString },
        ranch: { type: GraphQLString },
        field: { type: GraphQLString },
        job: { type: GraphQLString },
        logType: { type: GraphQLString },
        startTime: { type: GraphQLString },
        endTime: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const { employee, ranch, field, job, logType, startTime, endTime } = args;
        const allLogs = await WorkLog.find({ employee });
        if(allLogs.length) {
          const lastLog = allLogs.pop();
          lastLog.endTime = startTime;
          await lastLog.save();
          console.log(lastLog)
        }
        const newLog = await new WorkLog({ employee, ranch, field, job, logType, startTime, endTime }).save();
        console.log(newLog)
        return newLog;
      }
    },
    addJobCard: {
      type: JobCardType,
      description: 'Add a Job Card',
      args: {
        employee: { type: GraphQLString },
        startTime: { type: GraphQLString },
        endTime: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        const { employee, startTime, endTime } = args;
        const newLog = new JobCard({ employee, startTime, endTime }).save();
        return newLog;
      }
    },
  })
});

module.exports = RootMutation;