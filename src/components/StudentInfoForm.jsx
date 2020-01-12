import _ from 'lodash';
import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button
} from '@material-ui/core';
import './StudentInfoForm.css';

class StudentInfoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      grade: null,
      addtionalInfo: ''
    };
  }

  handleChange = (e, fieldName) => {
    const value = _.get(e, 'target.value');
    this.setState({ [fieldName]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log('submit', this.state);
  };

  render() {
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
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="last-name">Last Name</InputLabel>
            <Input
              id="last-name"
              aria-describedby="Enter Last Name"
              onChange={e => this.handleChange(e, 'lastName')}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="grade">Grade</InputLabel>
            <Input
              id="grade"
              aria-describedby="Enter Grade"
              onChange={e => this.handleChange(e, 'grade')}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="additional-info">Additional Info</InputLabel>
            <Input
              id="additional-info"
              aria-describedby="Enter Additional Info"
              onChange={e => this.handleChange(e, 'additionalInfo')}
            />
          </FormControl>
          <Button
            className="submit-button"
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </FormGroup>
      </div>
    );
  }
}

export default StudentInfoForm;