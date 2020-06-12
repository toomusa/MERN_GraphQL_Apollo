import React from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import moment from "moment";
import check from '../../utils/validateForms';
import { addLog, getAllLogs } from "../../queries";
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';

const tempData = {
  employees: [ "Musa", "Manny", "Sasha", "Kishore", "Shravan", "Shlomo", "Udi" ],
  ranches: [ "North", "South", "East", "West" ],
  fields: [ "Frontland", "Backland", "Sideland", "Farland" ],
  jobs: [ "Blueberries", "Peaches", "Oranges", "Melons" ],
  logTypes: [ "Time-In", "Time-Out", "Harvest", "Piece-Out", "Lunch", "Break" ]
}

function AddLogForm(props) {
  const { handleSubmit } = props;
  const [addNewLog, { loading, error }] = useMutation(addLog, {
    refetchQueries: [{ query: getAllLogs }]
    // update(cache, { data: { addNewLog }}) {
    //   const data = cache.readQuery({ query: getAllLogs });
    //   console.log(data)
    //   const updatedLogs = { allLogs: [ ...data.allLogs, addNewLog ]}
    //   console.log(updatedLogs)
    //   cache.writeQuery({
    //     query: getAllLogs,
    //     data: data
    //   })
    // }
  });

  const onSubmit = (formValues) => {
    const { reset } = props;
    formValues.startTime = moment().format('ll LTS');
    formValues.endTime = "";
    addNewLog({ variables: formValues });
    reset("workLog");
    // props.history.push("/dashboard");
  }

  const renderList = field => {
    return (
      <div className="form-row form-group input-box">
        <label className="col-md-3 col-sm-12 d-inline-block mt-2">{field.label}:</label>
        <div className="col-md-9 col-sm-12">
          <select {...field.input} {...field} autoComplete="on" className="form-control d-inline-block w-100 input-elem">
            <option value="">Select {field.label}</option>
            {field.tempdata?.map((item, idx) => <option value={item} key={idx}>{item}</option>)}
          </select>
          {field.meta.touched && field.meta.error && <span className="error-text w-100">* {field.meta.error}</span>}
        </div>
      </div>
    )
  }

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error...</p>;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field name="employee" component={renderList} label="Employee" tempdata={tempData.employees} validate={ [check.required] }/>
      <Field name="ranch" component={renderList} label="Ranch" tempdata={tempData.ranches} validate={ [check.required] }/>
      <Field name="field" component={renderList} label="Field" tempdata={tempData.fields} validate={ [check.required] }/>
      <Field name="job" component={renderList} label="Job" tempdata={tempData.jobs} validate={ [check.required] }/>
      <Field name="logType" component={renderList} label="Log Type" tempdata={tempData.logTypes} validate={ [check.required] }/>
      <button className="btn btn-primary float-right mr-2" disabled={loading || error} type="submit">Submit</button>
    </form>
  )
}

function mapStateToProps(state) {
  return { logs: state.graph.logs };
}

export default compose(
  connect(mapStateToProps, {}),
  reduxForm({ form: "workLog" }),
  withRouter
)(AddLogForm);