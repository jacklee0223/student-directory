import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import StudentsList from 'components/StudentsList';
import LeftMenu from 'components/LeftMenu';
import StudentInfoForm from 'components/StudentInfoForm';

export default function App(props) {
  return (
    <div className="app">
      <LeftMenu />
      <Route path="/" exact component={StudentsList} />
      <Route path="/add" component={StudentInfoForm} />
    </div>
  );
}
