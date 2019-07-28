import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => state;

const ManagerDashboard = (props) => {
  console.log(props)
return (
  <div>
Hello
  </div>
)
};

export default connect(mapStateToProps)(ManagerDashboard);
