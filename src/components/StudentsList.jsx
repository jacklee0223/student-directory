import _ from 'lodash';
import React, { Component } from 'react';
import './StudentsList.css';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { withStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SearchBar from 'components/SearchBar';

const styles = theme => ({
  table: {
    minWidth: 650
  }
});

class StudentsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ''
    };
  }
  componentDidMount() {
    const { getStudentsList } = this.props;

    getStudentsList();
  }

  handleSearchInput = searchTerm => {
    this.setState({ searchTerm });
  };

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
            </TableRow>
          </TableHead>
          <TableBody>{this.renderStudentsList(studentsList)}</TableBody>
        </Table>
      </TableContainer>
    );
  };

  renderStudentsList = studentsList => {
    const { searchTerm } = this.state;
    const filtered = _.filter(
      studentsList,
      student =>
        _.lowerCase(student.firstName) === _.lowerCase(searchTerm) ||
        _.lowerCase(student.lastName) === _.lowerCase(searchTerm)
    );

    const searchFiltered = _.size(searchTerm) ? filtered : studentsList;

    return _.map(searchFiltered, student => {
      return (
        <TableRow key={student._id}>
          <TableCell align="right">{student.firstName}</TableCell>
          <TableCell align="right">{student.lastName}</TableCell>
          <TableCell align="right">{student.grade}</TableCell>
        </TableRow>
      );
    });
  };

  render() {
    const studentsList = _.get(this.props, 'students_list');

    return (
      <div>
        <SearchBar handleSearchInput={this.handleSearchInput} {...this.props} />
        <div className="table-wrapper">{this.renderTable(studentsList)}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { students_list: state.students_list };
}

export default connect(
  mapStateToProps,
  actions
)(withStyles(styles)(StudentsList));
