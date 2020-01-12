import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

class StudentsList extends Component {
  componentDidMount() {
    const { getStudentsList } = this.props;

    getStudentsList();
  }

  render() {
    const studentsList = _.get(this.props, 'students_list');
    console.log('studentsList', studentsList);

    return <div>{_.map(studentsList, student => student.firstName)}</div>;
  }
}

function mapStateToProps(state) {
  return { students_list: state.students_list };
}

export default connect(mapStateToProps, actions)(StudentsList);
