import React from 'react';
import StudentsList from 'components/StudentsList';
import SearchBar from 'components/SearchBar';

export default function App(props) {
  return (
    <div>
      <SearchBar />
      <StudentsList />
    </div>
  );
}
