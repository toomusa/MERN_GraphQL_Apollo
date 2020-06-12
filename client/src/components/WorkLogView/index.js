import React from 'react';
import { getAllLogs } from "../../queries";
import { useQuery } from '@apollo/react-hooks';

function WorkLogView(props) {
  const { loading, error, data } = useQuery(getAllLogs);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div>
      {data.allLogs.map((log,idx) => (
        <ul className="log-list" key={idx}>
          <li>{log.employee}</li>
          <li>{log.ranch}</li>
          <li>{log.field}</li>
          <li>{log.job}</li>
          <li>{log.logType}</li>
          <li>{log.startTime}</li>
          <li>{log.endTime}</li>
        </ul>  
      ))}
    </div>
  )
}

export default WorkLogView;