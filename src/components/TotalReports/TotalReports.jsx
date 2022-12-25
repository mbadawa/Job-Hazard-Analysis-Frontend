import React from 'react';
import { TbReportSearch } from 'react-icons/tb';
function TotalReports(props) {
  return (
    <div className="flex justify-center w-full items-center bg-gray-100 p-10  ml-auto mr-auto rounded mb-5 w-1/2 gap-5">
      <TbReportSearch className="text-6xl" />

      <div className="flex flex-col font-bold">
        <p className="text-5xl">{props.totalReports}</p>
        <p className="text-2xl">Active Reports</p>
      </div>
    </div>
  );
}

export default TotalReports;
