import _ from 'lodash';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import * as actions from 'actions';

const styles = theme => ({
  table: {
    minWidth: 650
  }
});

class StudentsList extends Component {
  componentDidMount() {
    const { getStudentsList } = this.props;

    getStudentsList();
  }

  renderTable = studentsList => {
    const { classes } = this.props;

    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">FIRST NAME</TableCell>
              <TableCell align="right">LAST NAME</TableCell>
              <TableCell align="right">GRADE</TableCell>
              <TableCell align="right">ADDITIONAL INFO</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{this.renderStudentsList(studentsList)}</TableBody>
        </Table>
      </TableContainer>
    );
  };

  renderStudentsList = studentsList => {
    return _.map(studentsList, student => {
      return studentsList.map(row => (
        <TableRow key={row._id}>
          <TableCell align="right">{row.firstName}</TableCell>
          <TableCell align="right">{row.lastName}</TableCell>
          <TableCell align="right">{row.grade}</TableCell>
          <TableCell align="right">{row.additionalInfo}</TableCell>
        </TableRow>
      ));
    });
  };

  render() {
    const studentsList = _.get(this.props, 'students_list');

    return <div>{this.renderTable(studentsList)}</div>;
  }
}

function mapStateToProps(state) {
  return { students_list: state.students_list };
}

export default connect(
  mapStateToProps,
  actions
)(withStyles(styles)(StudentsList));
