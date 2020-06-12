import React from 'react'
import { getAllLogs } from "../../queries";
import { useQuery } from '@apollo/react-hooks';
import { ReactTabulator } from 'react-tabulator'
import 'react-tabulator/lib/css/bootstrap/tabulator_bootstrap4.css';
import "./style.css";

const columns = [
  { title: "Employee", field: "employee", width: 130, headerFilter: "select", headerFilterParams: {values:true}, headerFilterPlaceholder:"filter" },
  { title: "Ranch", field: "ranch", width: 100, headerFilter: "select", headerFilterParams: {values:true}, headerFilterPlaceholder:"filter" },
  { title: "Field", field: "field", width: 120, headerFilter: "select", headerFilterParams: {values:true}, headerFilterPlaceholder:"filter" },
  { title: "Job", field: "job", width: 120, headerFilter: "select", headerFilterParams: {values:true}, headerFilterPlaceholder:"filter" },
  { title: "LogType", field: "logType", width: 120, headerFilter: "select", headerFilterParams: {values:true}, headerFilterPlaceholder:"filter" },
  { title: "startTime", field: "startTime", width: 230 },
  { title: "endTime", field: "endTime", width: 230 }
];

export default function Table() {
  const { loading, error, data } = useQuery(getAllLogs);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <ReactTabulator
      data={data.allLogs}
      columns={columns}
      tooltips={true}
      layout={"fitData"}
      height={"auto"}
    />
  )
}
