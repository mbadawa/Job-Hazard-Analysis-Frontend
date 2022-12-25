import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { IoMdClose } from 'react-icons/io';
import Button from '@mui/material/Button';

function ViewReport(props) {
  const [expanded, setExpanded] = useState('generalInfo');
  const [disableFields, setDisableFields] = useState(true);
  const handleAccordionPanel = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const [employee, setEmployee] = useState([
    { employeeName: '', employeeID: '', employeeCertifications: '' },
  ]);

  const [analysisArray, setAnalysisArray] = useState([
    { activity: '', potentialHazards: '', proceduresEquipmentTraining: '' },
  ]);
  const handleAddEmployee = () => {
    setEmployee([...employee, { employeeName: '', employeeID: '' }]);
  };
  const handleRemoveEmployee = (index) => {
    const list = [...employee];
    list.splice(index, 1);
    setEmployee(list);
  };
  const handleEmployeeUpdate = (e, index) => {
    const { name, value } = e.target;
    const list = [...employee];
    list[index][name] = value;
    setEmployee(list);
  };

  const handleAddAnalysis = () => {
    setAnalysisArray([
      ...analysisArray,
      { activity: '', potentialHazards: '', proceduresEquipmentTraining: '' },
    ]);
  };
  const handleRemoveAnalysis = (index) => {
    const list = [...analysisArray];
    list.splice(index, 1);
    setAnalysisArray(list);
  };
  const handleAnalysisChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...analysisArray];
    list[index][name] = value;
    setAnalysisArray(list);
  };
  const [data, setData] = useState([]);

  const handleUnDisableFields = () => {
    setDisableFields(!disableFields);
  };
  const handleCloseModal = () => {
    props.closeModal();
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/findreport/${props.id}`)
      .then((res) => {
        const {
          id,
          fullName,
          superVisorName,
          companyName,
          projectName,
          projectDate,
          operation,
          departmentOrUnit,
          location,
          indoorOrOutdoor,
          trainingRequired,
          equipmentUsed,
          chemicalsUsed,
          additionalComments,
          employees,
          analysis,
        } = res.data;
        var date = new Date(projectDate);
        const formatedProjectDate =
          (date.getMonth() > 8
            ? date.getMonth() + 1
            : '0' + (date.getMonth() + 1)) +
          '/' +
          (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
          '/' +
          date.getFullYear();
        const employeesArray = JSON.parse(employees);
        const analysisArray = JSON.parse(analysis);
        setEmployee(employeesArray);
        setAnalysisArray(analysisArray);
        const data = {
          id,
          fullName,
          superVisorName,
          companyName,
          projectName,
          formatedProjectDate,
          operation,
          departmentOrUnit,
          location,
          indoorOrOutdoor,
          trainingRequired,
          equipmentUsed,
          chemicalsUsed,
          additionalComments,
        };
        setData([data]);
      })
      .catch((err) => console.error(err.message));
  }, []);
  console.log(data);

  return (
    <>
      {props.isOpen && (
        <div
          className="container absolute z-40 ml-auto mr-auto top-1/4 left-0 right-0 w-1/2 "
          data-modal-toggle="modalId"
        >
          {data.map((report) => {
            return (
              <form
                className="bg-gray-100 p-10 shadow relative container ml-auto mr-auto mt-5"
                action=""
              >
                <Accordion
                  expanded={expanded === 'generalInfo'}
                  onChange={handleAccordionPanel('generalInfo')}
                >
                  <AccordionSummary
                    sx={{ padding: '10px' }}
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography sx={{ color: 'black' }}>
                      General Informations
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      className="flex flex-col gap-7"
                      component="form"
                      noValidate
                      autoComplete="off"
                    >
                      <div className="md:flex grid grid-rows-2 gap-3">
                        <TextField
                          className="w-full"
                          id=""
                          label="Full Name"
                          name="fullName"
                          variant="filled"
                          placeholder="Please enter your name"
                          value={report.fullName}
                          disabled={disableFields}
                        />
                        <TextField
                          className="w-full"
                          id=""
                          name="superVisorName"
                          label="Supervisor Name"
                          variant="filled"
                          value={report.superVisorName}
                          disabled={disableFields}
                        />
                      </div>
                      <div className="md:flex grid grid-rows-2 gap-3">
                        <TextField
                          className="w-full"
                          id=""
                          name="companyName"
                          label="Company Name"
                          variant="filled"
                          value={report.companyName}
                          disabled={disableFields}
                        />
                        <TextField
                          className="w-full"
                          id=""
                          name="projectName"
                          label="Project Name"
                          variant="filled"
                          value={report.projectName}
                          disabled={disableFields}
                        />
                        <LocalizationProvider
                          name="projectDate"
                          dateAdapter={AdapterDayjs}
                        >
                          <DesktopDatePicker
                            className="w-full"
                            label="Project Date"
                            inputFormat="MM/DD/YYYY"
                            variant="filled"
                            TextFieldProps={{ variant: 'filled' }}
                            name="projectDate"
                            value={report.projectDate}
                            disabled={disableFields}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                        <TextField
                          className="w-full"
                          id=""
                          name="operation"
                          label="Operation"
                          variant="filled"
                          value={report.operation}
                          disabled={disableFields}
                        />
                      </div>
                      <div className="md:flex grid grid-rows-2 gap-3">
                        <TextField
                          className="w-full"
                          id=""
                          name="departmentOrUnit"
                          label="Department/Unit"
                          variant="filled"
                          value={report.departmentOrUnit}
                          disabled={disableFields}
                        />
                        <TextField
                          className="w-full"
                          id=""
                          name="location"
                          label="Location"
                          variant="filled"
                          value={report.location}
                          disabled={disableFields}
                        />
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Indoor"
                          value={'Indoor'}
                          checked={
                            report.indoorOrOutdoor === 'Indoor' ? true : false
                          }
                          name="indoorOrOutdoor"
                          disabled={disableFields}
                        />
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Outdoor"
                          value={'Outdoor'}
                          checked={
                            report.indoorOrOutdoor === 'Outdoor' ? true : false
                          }
                          name="indoorOrOutdoor"
                          disabled={disableFields}
                        />
                      </div>
                      <div className="md:flex grid grid-rows-2 gap-3">
                        <TextField
                          className="w-full"
                          id=""
                          name="trainingRequired"
                          label="Training required"
                          variant="filled"
                          value={report.trainingRequired}
                          disabled={disableFields}
                        />
                        <TextField
                          className="w-full"
                          id=""
                          name="equipmentUsed"
                          label="Equipment used"
                          variant="filled"
                          value={report.equipmentUsed}
                          disabled={disableFields}
                        />
                        <TextField
                          className="w-full"
                          id=""
                          name="chemicalsUsed"
                          label="Chemicals used"
                          variant="filled"
                          value={report.chemicalsUsed}
                          disabled={disableFields}
                        />
                      </div>
                      <TextField
                        id=""
                        name="additionalComments"
                        label="Additional comments"
                        variant="filled"
                        value={report.additionalComments}
                        disabled={disableFields}
                      />
                    </Box>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === 'employees'}
                  onChange={handleAccordionPanel('employees')}
                >
                  <AccordionSummary
                    sx={{ padding: '10px' }}
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography sx={{ color: 'black' }}>Employees</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="overflow-x-auto relative">
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                          <tr>
                            <th scope="col" className="py-3 px-6">
                              Full Name
                            </th>

                            <th scope="col" className="py-3 px-6">
                              Employee ID
                            </th>
                            <th scope="col" className="py-3 px-6">
                              Certifications
                            </th>
                          </tr>
                        </thead>
                        <tbody className="">
                          {employee.map((object, index) => (
                            <tr
                              key={index}
                              className="bg-gray-50 shadow border-b "
                            >
                              <th
                                scope="row"
                                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                              >
                                <TextField
                                  id=""
                                  label="Full Name"
                                  variant="filled"
                                  className="w-full"
                                  autoComplete="off"
                                  name="employeeName"
                                  value={object.employeeName}
                                  onChange={(e) =>
                                    handleEmployeeUpdate(e, index)
                                  }
                                  disabled={disableFields}
                                />
                              </th>
                              <td className="py-4 px-6">
                                <TextField
                                  id=""
                                  label="Employee ID"
                                  variant="filled"
                                  className="w-full"
                                  autoComplete="off"
                                  name="employeeID"
                                  value={object.employeeID}
                                  onChange={(e) =>
                                    handleEmployeeUpdate(e, index)
                                  }
                                  disabled={disableFields}
                                />
                              </td>
                              <td className="py-4 px-6 flex items-center gap-3">
                                <TextField
                                  id=""
                                  label="Employee Certifications"
                                  placeholder="List all employee certifications using , to seprate"
                                  variant="filled"
                                  className="w-full"
                                  autoComplete="off"
                                  name="employeeCertifications"
                                  value={object.employeeCertifications}
                                  onChange={(e) =>
                                    handleEmployeeUpdate(e, index)
                                  }
                                  disabled={disableFields}
                                />
                                {employee.length > 1 && (
                                  <ClearIcon
                                    className="cursor-pointer"
                                    sx={{ color: 'red' }}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleRemoveEmployee(index);
                                    }}
                                  />
                                )}
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td>
                              <Button
                                sx={{
                                  marginTop: '10px',
                                  background: '#439243',
                                  ':hover': {
                                    background: '#469746',
                                  },
                                }}
                                variant="contained"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleAddEmployee();
                                }}
                                disabled={disableFields}
                              >
                                Add Employee
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === 'analysis'}
                  onChange={handleAccordionPanel('analysis')}
                >
                  <AccordionSummary
                    sx={{ padding: '10px' }}
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography sx={{ color: 'black' }}>Analysis</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="overflow-x-auto relative">
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                          <tr>
                            <th scope="col" className="py-3 px-6">
                              Activity
                            </th>
                            <th scope="col" className="py-3 px-6">
                              Potential Hazards
                            </th>
                            <th scope="col" className="py-3 px-6">
                              Procedures/Equipment/Training
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {analysisArray.map((myAnalysis, index) => (
                            <tr
                              key={index}
                              className="bg-gray-50 shadow border-b "
                            >
                              <th
                                scope="row"
                                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                              >
                                <TextField
                                  id=""
                                  label="Activity"
                                  variant="filled"
                                  className="w-full"
                                  autoComplete="off"
                                  name="activity"
                                  onChange={(e) =>
                                    handleAnalysisChange(e, index)
                                  }
                                  value={myAnalysis.activity}
                                  disabled={disableFields}
                                />
                              </th>
                              <td className="py-4 px-6">
                                <TextField
                                  id=""
                                  label="Potential Hazards"
                                  variant="filled"
                                  className="w-full"
                                  autoComplete="off"
                                  name="potentialHazards"
                                  onChange={(e) =>
                                    handleAnalysisChange(e, index)
                                  }
                                  value={myAnalysis.potentialHazards}
                                  disabled={disableFields}
                                />
                              </td>
                              <td className="py-4 px-6 flex items-center gap-3">
                                <TextField
                                  id=""
                                  label="Procedures/Equipment/Training"
                                  variant="filled"
                                  className="w-full"
                                  autoComplete="off"
                                  name="proceduresEquipmentTraining"
                                  onChange={(e) =>
                                    handleAnalysisChange(e, index)
                                  }
                                  value={myAnalysis.proceduresEquipmentTraining}
                                  disabled={disableFields}
                                />
                                {analysisArray.length > 1 && (
                                  <ClearIcon
                                    className="cursor-pointer"
                                    sx={{ color: 'red' }}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleRemoveAnalysis(index);
                                    }}
                                  />
                                )}
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td>
                              <Button
                                sx={{
                                  marginTop: '10px',
                                  background: '#439243',
                                  ':hover': {
                                    background: '#469746',
                                  },
                                }}
                                variant="contained"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleAddAnalysis();
                                }}
                                disabled={disableFields}
                              >
                                Add Employee
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <div className="flex items-center gap-2 mt-5">
                  <Button
                    variant="contained"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      background: '#439243',
                      ':hover': {
                        background: '#469746',
                      },
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleUnDisableFields();
                    }}
                  >
                    {disableFields ? 'Edit' : 'Cancel Edit'}
                  </Button>
                  <Button
                    sx={{
                      background: '#cb2828',
                      ':hover': {
                        background: '#ad3333',
                      },
                    }}
                    variant="contained"
                    onClick={handleCloseModal}
                  >
                    Close
                  </Button>
                </div>
              </form>
            );
          })}
        </div>
      )}
    </>
  );
}

export default ViewReport;
