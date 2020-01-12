import React from 'react';
import './LeftMenu.css';
import Button from '@material-ui/core/Button';

function LeftMenu(props) {
  return (
    <div className="left-menu">
      <h3>Students Directory</h3>
      <Button href="#text-buttons">Add a Student</Button>
    </div>
  );
}

export default LeftMenu;
