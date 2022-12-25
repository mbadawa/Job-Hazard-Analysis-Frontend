import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ViewReport from '../ViewReport/ViewEditReport';
import { GoDesktopDownload } from 'react-icons/go';
import TotalReports from '../TotalReports/TotalReports';
function List() {
  const [reports, setReports] = useState([]);
  const [viewReport, setViewReport] = useState(false);
  const [reportID, setReportID] = useState();
  const handleViewReport = () => {
    setViewReport(!viewReport);
  };
  const handleDeleteReport = (id) => {
    axios
      .delete(`http://localhost:5000/api/delete/${id}`)
      .then((res) => {
        console.log(res);
        setReports(reports.filter((report) => report.id !== id));
      })
      .catch((err) => console.error(err.message));
    console.log(reports);
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 30 },
    { field: 'fullName', headerName: 'Full Name', width: 150 },
    { field: 'superVisorName', headerName: 'Supervisor', width: 150 },
    { field: 'companyName', headerName: 'Company Name', width: 150 },
    { field: 'projectName', headerName: 'Project Name', width: 150 },
    { field: 'projectDate', headerName: 'Project Date', width: 150 },
    { field: 'departmentOrUnit', headerName: 'Department/Unit', width: 150 },
    { field: 'location', headerName: 'location', width: 150 },
    {
      field: 'PDF',
      renderCell: (cellValue) => {
        return (
          <Button
            className="flex items-center gap-1"
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <GoDesktopDownload />
            PDF
          </Button>
        );
      },
    },
    {
      field: 'View',
      width: 150,
      renderCell: (dataIndex) => {
        return (
          <Button
            name="view"
            sx={{
              background: '#439243',

              ':hover': {
                background: '#469746',
              },
            }}
            variant="contained"
            onClick={() => {
              handleViewReport(dataIndex.id);
              setReportID(dataIndex.id);
            }}
          >
            View/Edit
          </Button>
        );
      },
    },

    {
      field: 'Delete',
      renderCell: (dataIndex) => {
        return (
          <Button
            sx={{
              background: '#cb2828',
              ':hover': {
                background: '#ad3333',
              },
            }}
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              handleDeleteReport(dataIndex.id);
            }}
          >
            DELETE
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/getAllReports')
      .then((res) => {
        setReports(res.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  return (
    <div>
      <div className="flex items-center w-full gap-3 ml-auto mr-auto container">
        <TotalReports totalReports={reports.length} />
        <TotalReports totalReports={reports.length} />
        <TotalReports totalReports={reports.length} />
      </div>
      {viewReport && (
        <ViewReport
          id={reportID}
          isOpen={viewReport}
          closeModal={handleViewReport}
        />
      )}
      <div
        style={{ height: 400, width: '100%' }}
        className="container ml-auto mr-auto "
      >
        <DataGrid
          rows={reports}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
}

export default List;
