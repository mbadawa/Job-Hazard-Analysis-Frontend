import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Title from '../components/Title/Title';
import Button from '@mui/material/Button';
import moment from 'moment';
import axios from 'axios';
import { useEffect, useState, useReducer } from 'react';
import ViewEditReport from '../components/ViewEditReport/ViewEditReport';
import CustomeModal from '../components/CustomModal/CustomeModal';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { IoClose } from 'react-icons/io5';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Footer from '../components/Footer/Footer';
import Pagenation from '../components/Pagenation/Pagenation';

function Dashboard() {
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

  // Pagentation
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(3);

  const lastReportIndex = currentPage * reportsPerPage;
  const firstReportIndex = lastReportIndex - reportsPerPage;

  const currentReport = reports.slice(firstReportIndex, lastReportIndex);

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
    <div className="relative">
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Dasshobard</title>
        </Helmet>
      </HelmetProvider>

      {/* Top Navbar */}
      <Navbar />
      <Title title={'All Reports'} />
      <div className="mt-5">
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
            className="container ml-auto mr-auto overflow-y-auto	"
          >
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-50 uppercase bg-gray-600 ">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    ID
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Full Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Supervisor
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Company Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Project Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Project Date
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Department/Unit
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Location
                  </th>
                  <th scope="col" className="py-3 px-6">
                    View/Edit
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-50 shadow-lg text-gray-600">
                {currentReport.map((report, index) => {
                  return (
                    <tr>
                      <td className="py-4 px-6">{report.id}</td>
                      <td className="py-4 px-6">{report.fullName}</td>
                      <td className="py-4 px-6">{report.superVisorName}</td>
                      <td className="py-4 px-6">{report.companyName}</td>
                      <td className="py-4 px-6">{report.projectName}</td>
                      <td className="py-4 px-6">{report.projectDate}</td>
                      <td className="py-4 px-6">{report.departmentOrUnit}</td>
                      <td className="py-4 px-6">{report.location}</td>
                      <td className="py-4 px-6">
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
                            document.querySelector(
                              '.dialog_container'
                            ).style.display = 'block';
                            setReportID(report.id);
                          }}
                        >
                          View/Edit
                        </Button>
                      </td>
                      <td className="py-4 px-6">
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

                            handleDeleteReport(report.id);
                          }}
                        >
                          DELETE
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <Pagenation
              totalReports={reports.length}
              reportsPerPage={reportsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
