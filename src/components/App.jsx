import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import * as actions from 'actions';
import StudentsList from 'components/StudentsList';
import LeftMenu from 'components/LeftMenu';

function App(props) {
  return (
    <div className="app">
      <LeftMenu />
      <StudentsList {...props} />
    </div>
  );
}

function mapStateToProps(state) {
  return { students_list: state.students_list };
}

export default connect(mapStateToProps, actions)(App);
