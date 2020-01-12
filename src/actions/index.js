import axios from 'axios';
import { SET_STUDENTS_LIST } from 'actions/types';

const baseUrl = 'http://localhost:5000/api/students';

export const getStudentsList = () => async dispatch => {
  try {
    const response = await axios.get(`${baseUrl}/getall`);
    dispatch({ type: SET_STUDENTS_LIST, payload: response.data });
  } catch (e) {
    console.log(`Error`);
  }
};
