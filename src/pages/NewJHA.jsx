import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Form from '../components/Form/Form';
import Title from '../components/Title/Title';
function NewTask() {
  return (
    <div>
      <Navbar />
      <Title title="New Job Hazard Analysis" />
      <Form />
    </div>
  );
}

export default NewTask;
