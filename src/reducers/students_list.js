import { SET_STUDENTS_LIST } from 'actions/types';

const INITIAL_STATE = {
  students_list: []
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_STUDENTS_LIST:
      return { ...state, students_list: payload };
    default:
      return state;
  }
};
