import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import List from '../components/List/List';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Title from '../components/Title/Title';
function Dashboard() {
  return (
    <div className="relative">
      {/* Top Navbar */}
      <Navbar />
      <Title title={'All Reports'} />
      <div className="mt-5">
        <List />
      </div>
    </div>
  );
}

export default Dashboard;
