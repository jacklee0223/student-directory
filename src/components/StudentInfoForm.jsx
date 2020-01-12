import _ from 'lodash';
import queryString from 'query-string';
import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button
} from '@material-ui/core';
import './StudentInfoForm.css';
import { connect } from 'react-redux';
import * as actions from 'actions';

class StudentInfoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: '',
      firstName: '',
      lastName: '',
      grade: '',
      additionalInfo: ''
    };
  }

  componentDidMount() {
    const search = _.get(this.props, 'location.search');
    const queries = queryString.parse(search);
    const { _id, firstName, lastName, grade, additionalInfo } = queries;

    this.setState({
      _id,
      firstName,
      lastName,
      grade,
      additionalInfo
    });
  }

  handleChange = (e, fieldName) => {
    const value = _.get(e, 'target.value');
    this.setState({ [fieldName]: value });
  };

  handleSubmit = (e, isUpdate) => {
    e.preventDefault();
    const { createStudent, updateStudent } = this.props;
    const { _id, firstName, lastName, grade, additionalInfo } = this.state;
    const search = _.get(this.props, 'location.search');
    console.log(search);

    if (!_.size(firstName) || !_.size(lastName))
      alert('Need to enter first and last name');

    const formProps = {
      firstName,
      lastName,
      grade,
      additionalInfo
    };

    if (isUpdate) {
      updateStudent({ ...formProps, _id }, () => this.props.history.push('/'));
    } else {
      createStudent(formProps, () => this.props.history.push('/'));
    }
  };

  render() {
    const { firstName, lastName, grade, additionalInfo } = this.state;
    const pathname = _.get(this.props, 'location.pathname');
    const isUpdate = pathname === '/update';

    return (
      <div className="form-wrapper">
        <h3>Create New Student</h3>
        <FormGroup>
          <FormControl>
            <InputLabel htmlFor="first-name">First Name</InputLabel>
            <Input
              id="first-name"
              aria-describedby="Enter First Name"
              onChange={e => this.handleChange(e, 'firstName')}
              value={firstName}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="last-name">Last Name</InputLabel>
            <Input
              id="last-name"
              aria-describedby="Enter Last Name"
              onChange={e => this.handleChange(e, 'lastName')}
              value={lastName}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="grade">Grade</InputLabel>
            <Input
              id="grade"
              aria-describedby="Enter Grade"
              onChange={e => this.handleChange(e, 'grade')}
              value={grade}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="additional-info">Additional Info</InputLabel>
            <Input
              id="additional-info"
              aria-describedby="Enter Additional Info"
              onChange={e => this.handleChange(e, 'additionalInfo')}
              value={additionalInfo}
            />
          </FormControl>
          <Button
            className="submit-button"
            variant="contained"
            color="primary"
            onClick={e => this.handleSubmit(e, isUpdate)}
          >
            {isUpdate ? 'Update Info' : 'Create New'}
          </Button>
        </FormGroup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { students_list: state.students_list };
}

export default connect(mapStateToProps, actions)(StudentInfoForm);
