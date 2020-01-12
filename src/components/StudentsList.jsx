import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import './StudentsList.css';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { withStyles } from '@material-ui/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
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

  handleEdit = student => {
    const { _id, firstName, lastName, grade, additionalInfo } = student;
    this.props.history.push(
      `/update?_id=${_id}&firstName=${firstName}&lastName=${lastName}&grade=${grade}&additionalInfo=${additionalInfo}`
    );
  };

  handleDelete = _id => {
    const { removeStudent } = this.props;

    removeStudent({ _id });
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
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
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
        _.includes(_.lowerCase(student.firstName), _.lowerCase(searchTerm)) ||
        _.includes(_.lowerCase(student.lastName), _.lowerCase(searchTerm))
    );

    const searchFiltered = _.size(searchTerm) ? filtered : studentsList;

    return _.map(searchFiltered, student => {
      return (
        <Tooltip title={student.additionalInfo} aria-label="additional info">
          <TableRow key={student._id}>
            <TableCell align="right">{student.firstName}</TableCell>
            <TableCell align="right">{student.lastName}</TableCell>
            <TableCell align="right">{student.grade}</TableCell>
            <TableCell align="right">
              <EditIcon
                className="edit-icon"
                onClick={() => this.handleEdit(student)}
              />
            </TableCell>
            <TableCell align="right">
              <DeleteIcon
                className="delete-icon"
                onClick={() => this.handleDelete(student._id)}
              />
            </TableCell>
          </TableRow>
        </Tooltip>
      );
    });
  };

  render() {
    const studentsList = _.get(this.props, 'students_list');

    return (
      <div className="students-list-wrapper">
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
