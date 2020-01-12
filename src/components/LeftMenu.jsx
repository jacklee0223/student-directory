import React from 'react';
import './LeftMenu.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

function LeftMenu(props) {
  return (
    <div className="left-menu">
      <h3>Students Directory</h3>
      <Link to="/">
        <Button>Students List</Button>
      </Link>
      <Link to="/add">
        <Button>Add a Student</Button>
      </Link>
    </div>
  );
}

export default LeftMenu;
