import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import students_list from 'reducers/students_list';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export default ({ children }) => {
  const store = createStore(students_list, applyMiddleware(thunk, logger));

  return <Provider store={store}>{children}</Provider>;
};
