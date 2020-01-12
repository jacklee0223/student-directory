import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import StudentsList from 'components/StudentsList';

function App(props) {
  return (
    <div>
      <StudentsList {...props} />
    </div>
  );
}

function mapStateToProps(state) {
  return { students_list: state.students_list };
}

export default connect(mapStateToProps, actions)(App);
