import { gql } from "apollo-boost";
// or you can use `import gql from 'graphql-tag';` instead

export const getAllLogs = gql`
  {
    allLogs {
      _id
      employee
      ranch
      field
      job
      logType
      startTime
      endTime  
    }
  }
`

export const addLog = gql`
  mutation($employee: String!, $field: String!, $ranch: String!, $job: String!, $logType: String!, $startTime: String!, $endTime: String!,) {
    addLog(employee: $employee, field: $field, ranch: $ranch, job: $job, logType: $logType, startTime: $startTime, endTime: $endTime) {
      _id
      ranch
      field
      job
      logType
      startTime
      endTime
    }
  }
`


// client
//   .query({
//     query: gql`
//       {
//         rates(currency: "USD") {
//           currency
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));




// mutation {
//   addLog(employee: "Musa", field: "North", ranch: "Frontyard", job: "Peaches", logType: "Time in", startTime: "Jun 10 2020 08:30:32 AM", endTime: "Jun 10 2020 02:14:52 PM") {
//     _id
//     field
//     ranch
//     job
//     logType
//     startTime
//     endTime
//   }
// }


// {
//   allLogs{
//     _id
//     employee
//     field
//     ranch
//     job
//     logType
//     startTime
//     endTime    
//   }
// }

// {
//   logByEmployee (employee: "Musa") {
//     _id
//     employee
//     field
//     ranch
//     job
//     logType
//     startTime
//     endTime    
//   }
// }