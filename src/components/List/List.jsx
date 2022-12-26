import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import moment from 'moment';
import axios from 'axios';
import { useEffect, useState, useReducer } from 'react';
import ViewEditReport from '../ViewEditReport/ViewEditReport';
import { GoDesktopDownload } from 'react-icons/go';
import CustomeModal from '../CustomModal/CustomeModal';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { IoClose } from 'react-icons/io5';

function List() {
  const [successAlert, setSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleShowSuccessAlert = () => {
    setSuccessAlert(!successAlert);
  };
  const [hideApiErrorMessages, setHideApiErrorMessages] = useState(false);
  const handleHideAllApiErrorMessages = () => {
    setHideApiErrorMessages(!hideApiErrorMessages);
  };
  const [apiErrorMessage, setApiErrorMessage] = useState([]);
  const [reports, setReports] = useState([]);
  const handleDeleteApiErrorMessages = (index) => {
    setApiErrorMessage([
      ...apiErrorMessage.slice(0, index),
      ...apiErrorMessage.slice(index + 1, apiErrorMessage.length),
    ]);
  };
  const [reportID, setReportID] = useState();
  const [updateList, setUpdateList] = useReducer((x) => x + 1, 0);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenCloseModal = () => {
    setOpenModal(!openModal);
  };

  const handleUpdateList = () => {
    setUpdateList();
  };
  const handleDeleteReport = (id) => {
    axios
      .delete(`http://localhost:5000/api/delete/${id}`)
      .then((res) => {
        handleUpdateList();
        setSuccessAlert(true);
        setSuccessMessage(`Report number ${id} has been deleted successfully`);
      })
      .catch((err) => console.error(err.message));
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 30 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 100,
      hideSortIcon: true,
    },
    { field: 'superVisorName', headerName: 'Supervisor', width: 100 },
    { field: 'companyName', headerName: 'Company Name', width: 100 },
    { field: 'projectName', headerName: 'Project Name', width: 100 },
    { field: 'projectDate', headerName: 'Project Date', width: 100 },
    { field: 'departmentOrUnit', headerName: 'Department/Unit', width: 100 },
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
              document.querySelector('.dialog_container').style.display =
                'block';
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
        res.data.map((report) => {
          return (report.projectDate = moment(report.projectDate).format(
            'MM/DD/YYYY'
          ));
        });
        setReports(res.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [updateList]);
  const handleDeleteAllReports = () => {
    axios
      .delete('http://localhost:5000/api/deleteAll/')
      .then((res) => {
        setUpdateList();
        setSuccessAlert(true);
        setSuccessMessage('All of the JHA reports been deleted!');
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  return (
    <div className="container ml-auto mr-auto">
      <Snackbar
        open={successAlert}
        autoHideDuration={3000}
        onClose={handleShowSuccessAlert}
      >
        <Alert severity="success" sx={{ width: '400px' }}>
          <p>{successMessage}</p>
          <IoClose
            onClick={() => {
              handleShowSuccessAlert();
            }}
            className="absolute right-5 top-0 bottom-0 mt-auto mb-auto text-lg cursor-pointer"
          />
        </Alert>
      </Snackbar>
      <div className="flex flex-col gap-2 mb-3">
        {hideApiErrorMessages &&
          apiErrorMessage.map((erros, index) => {
            return (
              <div className="flex flex-col gap-3">
                <Alert severity="warning">
                  Warning failed to save the report!
                </Alert>
                <Alert severity="error" className="relative">
                  {erros.msg}
                  <IoClose
                    onClick={() => {
                      handleDeleteApiErrorMessages(index);
                    }}
                    className="absolute right-5 top-0 bottom-0 mt-auto mb-auto text-lg cursor-pointer"
                  />
                </Alert>
              </div>
            );
          })}
      </div>
      <Button
        sx={{
          background: '#cb2828',
          marginBottom: '15px',
          padding: '10px',
          ':hover': {
            background: '#ad3333',
          },
        }}
        variant="contained"
        onClick={(e) => {
          e.preventDefault();
          handleOpenCloseModal();
        }}
      >
        Delete All
      </Button>
      <CustomeModal
        openModal={openModal}
        handleOpenCloseModal={handleOpenCloseModal}
        title={'Warning'}
        description="You are about to delete all of the reports. Please click confirm to
				delete all otherwise click cancel"
        actionButton={'Delete All'}
        actionButtonFunction={handleDeleteAllReports}
      />
      <ViewEditReport
        handleShowSuccessAlert={handleShowSuccessAlert}
        setHideApiErrorMessages={setHideApiErrorMessages}
        handleHideAllApiErrorMessages={handleHideAllApiErrorMessages}
        setSuccessMessage={setSuccessMessage}
        setApiErrorMessage={setApiErrorMessage}
        id={reportID}
        handleUpdateList={handleUpdateList}
      />
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
