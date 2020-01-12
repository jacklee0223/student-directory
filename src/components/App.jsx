import React from 'react';
import './App.css';
import StudentsList from 'components/StudentsList';
import LeftMenu from 'components/LeftMenu';
import { Route } from 'react-router-dom';

export default function App(props) {
  return (
    <div className="app">
      <LeftMenu />
      <Route path="/" exact component={StudentsList} />
    </div>
  );
}
