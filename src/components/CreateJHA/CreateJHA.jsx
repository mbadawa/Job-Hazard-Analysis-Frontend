import React, { useEffect } from 'react';
import axios from 'axios';
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
import Button from '@mui/material/Button';
import { useState } from 'react';

import { useFormik } from 'formik';
import schema from '../../utils/ValidationSchema';
import InitialValues from '../../utils/InitialValues';
import MuiAlert from '@mui/material/Alert';
import { IoClose } from 'react-icons/io5';

function Form() {
  const [successAlert, setSuccessAlert] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleShowSuccessAlert = () => {
    setSuccessAlert(!successAlert);
  };
  const [apiErrorMessage, setApiErrorMessage] = useState([]);
  const handleDeleteApiErrorMessages = (index) => {
    setApiErrorMessage([
      ...apiErrorMessage.slice(0, index),
      ...apiErrorMessage.slice(index + 1, apiErrorMessage.length),
    ]);
  };
  const [hideApiErrorMessages, setHideApiErrorMessages] = useState(false);
  const handleHideAllApiErrorMessages = () => {
    setHideApiErrorMessages(!hideApiErrorMessages);
  };
  const [expanded, setExpanded] = useState('generalInfo');
  const handleAccordionPanel = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // Handle employee section dynamic inputs etc
  const [employee, setEmployee] = useState([
    { employeeName: '', employeeID: '', employeeCertifications: '' },
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

  // Handles analysis section dynamic inputs etc
  const [analysisArray, setAnalysisArray] = useState([
    { activity: '', potentialHazards: '', proceduresEquipmentTraining: '' },
  ]);
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
  //   Assigining employees and analysis inputs to the initalvalues object
  InitialValues.employees = employee;
  InitialValues.analysis = analysisArray;
  const data = useFormik({
    initialValues: InitialValues,
    validateOnChange: false,
    validationSchema: schema,
    onSubmit: () => {
      const { indoorOrOutdoor } = data.values;
      data.values.employees = JSON.stringify(employee);
      data.values.analysis = JSON.stringify(analysisArray);
      data.values.indoorOrOutdoor = JSON.stringify(indoorOrOutdoor);
      // Resets the form after the data sent
      data.resetForm();
      setEmployee([
        { employeeName: '', employeeID: '', employeeCertifications: '' },
      ]);
      setAnalysisArray([
        { activity: '', potentialHazards: '', proceduresEquipmentTraining: '' },
      ]);

      axios
        .post('http://localhost:5000/api/createJHA', data.values)
        .then(function (res) {
          handleHideAllApiErrorMessages();
          // Shows Success Message
          handleShowSuccessAlert();
        })
        .catch(function (err) {
          setHideApiErrorMessages(true);
          setApiErrorMessage(err.response.data.errors);
        });
    },
  });

  useEffect(() => {
    if (data.errors !== {}) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      setExpanded('generalInfo');
      handleAccordionPanel('generalInfo');
    }
  }, [data.isSubmitting === false]);

  return (
    <form
      onSubmit={data.handleSubmit}
      className="container ml-auto mr-auto mt-5"
    >
      {successAlert && (
        <Alert severity="success" className="relative ">
          Job Hazard Analysis been submited successfully!
          <IoClose
            onClick={() => {
              handleShowSuccessAlert();
            }}
            className="absolute right-5 top-0 bottom-0 mt-auto mb-auto text-lg cursor-pointer"
          />
        </Alert>
      )}
      {/* Handles API */}
      {hideApiErrorMessages && (
        <div className="flex flex-col gap-2">
          {apiErrorMessage.map((erros, index) => {
            return (
              <Alert severity="error" className="relative">
                {erros.msg}
                <IoClose
                  onClick={() => {
                    handleDeleteApiErrorMessages(index);
                  }}
                  className="absolute right-5 top-0 bottom-0 mt-auto mb-auto text-lg cursor-pointer"
                />
              </Alert>
            );
          })}
        </div>
      )}

      <Accordion
        expanded={expanded === 'generalInfo'}
        onChange={handleAccordionPanel('generalInfo')}
      >
        <AccordionSummary
          sx={{ padding: '10px' }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography sx={{ color: 'black' }}>General Informations</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            className="flex flex-col gap-7"
            component="form"
            noValidate
            autoComplete="off"
          >
            <div className="md:flex grid grid-rows-2 gap-3">
              <span className="flex flex-col gap-2 w-full">
                <TextField
                  className="w-full"
                  id=""
                  label="Full Name"
                  name="fullName"
                  variant="filled"
                  placeholder="Please enter your name"
                  value={data.values.fullName}
                  onChange={data.handleChange}
                  onBlur={data.handleBlur}
                  error={
                    data.touched.fullName && data.errors.fullName ? true : false
                  }
                />
                {data.touched.fullName && data.errors.fullName ? (
                  <p className="text-red-500 text-sm">{data.errors.fullName}</p>
                ) : (
                  <p className="text-gray-400 text-sm">Required</p>
                )}
              </span>
              <span className="flex flex-col gap-2 w-full">
                <TextField
                  className="w-full"
                  id=""
                  name="superVisorName"
                  label="Supervisor Name"
                  variant="filled"
                  value={data.values.superVisorName}
                  onChange={data.handleChange}
                  onBlur={data.handleBlur}
                  error={
                    data.touched.superVisorName && data.errors.superVisorName
                      ? true
                      : false
                  }
                />
                {data.touched.superVisorName && data.errors.superVisorName ? (
                  <p className="text-red-500 text-sm">
                    {data.errors.superVisorName}
                  </p>
                ) : (
                  <p className="text-gray-400 text-sm">Required</p>
                )}
              </span>
            </div>
            <div className="md:flex grid grid-rows-2 gap-3">
              <span className="flex flex-col gap-2 w-full">
                <TextField
                  className="w-full"
                  id=""
                  name="companyName"
                  label="Company Name"
                  variant="filled"
                  value={data.values.companyName}
                  onChange={data.handleChange}
                  onBlur={data.handleBlur}
                  error={
                    data.touched.companyName && data.errors.companyName
                      ? true
                      : false
                  }
                />
                {data.touched.companyName && data.errors.companyName ? (
                  <p className="text-red-500 text-sm">
                    {data.errors.companyName}
                  </p>
                ) : (
                  <p className="text-gray-400 text-sm">Required</p>
                )}
              </span>
              <span className="flex flex-col gap-2 w-full">
                <TextField
                  className="w-full"
                  id=""
                  name="projectName"
                  label="Project Name"
                  variant="filled"
                  value={data.values.projectName}
                  onChange={data.handleChange}
                  onBlur={data.handleBlur}
                  error={
                    data.touched.projectName && data.errors.projectName
                      ? true
                      : false
                  }
                />
                {data.touched.projectName && data.errors.projectName ? (
                  <p className="text-red-500 text-sm">
                    {data.errors.projectName}
                  </p>
                ) : (
                  <p className="text-gray-400 text-sm">Required</p>
                )}
              </span>
              <LocalizationProvider
                name="projectDate"
                dateAdapter={AdapterDayjs}
              >
                <span className="flex flex-col gap-2 w-full">
                  <DesktopDatePicker
                    className="w-full"
                    label="Project Date"
                    inputFormat="MM/DD/YYYY"
                    variant="filled"
                    TextFieldProps={{ variant: 'filled' }}
                    name="projectDate"
                    value={data.values.projectDate}
                    onChange={(date) =>
                      data.handleChange({
                        target: { value: date, name: 'projectDate' },
                      })
                    }
                    onBlur={data.handleBlur}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  {data.touched.projectDate && data.errors.projectDate ? (
                    <p className="text-red-500 text-sm">
                      Please enter a valid date
                    </p>
                  ) : (
                    <p className="text-gray-400 text-sm">Required</p>
                  )}
                </span>
              </LocalizationProvider>
              <span className="flex flex-col gap-2 w-full">
                <TextField
                  className="w-full"
                  id=""
                  name="operation"
                  label="Operation"
                  variant="filled"
                  value={data.values.operation}
                  onChange={data.handleChange}
                  onBlur={data.handleBlur}
                  error={
                    data.touched.operation && data.errors.operation
                      ? true
                      : false
                  }
                />
                {data.touched.operation && data.errors.operation ? (
                  <p className="text-red-500 text-sm">
                    {data.errors.operation}
                  </p>
                ) : (
                  <p className="text-gray-400 text-sm">Required</p>
                )}
              </span>
            </div>
            <div className="md:flex grid grid-rows-2 gap-3">
              <span className="flex flex-col gap-2 w-full">
                <TextField
                  className="w-full"
                  id=""
                  name="departmentOrUnit"
                  label="Department/Unit"
                  variant="filled"
                  value={data.values.departmentOrUnit}
                  onChange={data.handleChange}
                  onBlur={data.handleBlur}
                  error={
                    data.touched.departmentOrUnit &&
                    data.errors.departmentOrUnit
                      ? true
                      : false
                  }
                />
                {data.touched.departmentOrUnit &&
                data.errors.departmentOrUnit ? (
                  <p className="text-red-500 text-sm">
                    {data.errors.departmentOrUnit}
                  </p>
                ) : (
                  <p className="text-gray-400 text-sm">Required</p>
                )}
              </span>
              <div className="flex items-center gap-3  w-full">
                <span className="flex flex-col gap-2 w-full">
                  {' '}
                  <TextField
                    className="w-full"
                    id=""
                    name="location"
                    label="Location"
                    variant="filled"
                    value={data.values.location}
                    onChange={data.handleChange}
                    onBlur={data.handleBlur}
                    error={
                      data.touched.location && data.errors.location
                        ? true
                        : false
                    }
                  />
                  {data.touched.location && data.errors.location ? (
                    <p className="text-red-500 text-sm">
                      {data.errors.location}
                    </p>
                  ) : (
                    <p className="text-gray-400 text-sm">Required</p>
                  )}
                </span>
                <span className="flex items-center mb-6">
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Indoor"
                    value="indoor"
                    name="indoorOrOutdoor"
                    onChange={data.handleChange}
                    onBlur={data.handleBlur}
                    checked={
                      data.values.indoorOrOutdoor.includes('indoor')
                        ? true
                        : false
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Outdoor"
                    value="outdoor"
                    name="indoorOrOutdoor"
                    onChange={data.handleChange}
                    onBlur={data.handleBlur}
                    checked={
                      data.values.indoorOrOutdoor.includes('outdoor')
                        ? true
                        : false
                    }
                  />
                </span>
              </div>
            </div>
            <div className="md:flex grid grid-rows-2 gap-3">
              <TextField
                className="w-full"
                id=""
                name="ppeRequired"
                label="PPE Required"
                variant="filled"
                value={data.values.ppeRequired}
                onChange={data.handleChange}
                onBlur={data.handleBlur}
              />
              <TextField
                className="w-full"
                id=""
                name="trainingRequired"
                label="Training Required"
                variant="filled"
                value={data.values.trainingRequired}
                onChange={data.handleChange}
                onBlur={data.handleBlur}
              />
              <TextField
                className="w-full"
                id=""
                name="equipmentUsed"
                label="Equipment used"
                variant="filled"
                value={data.values.equipmentUsed}
                onChange={data.handleChange}
                onBlur={data.handleBlur}
              />
              <TextField
                className="w-full"
                id=""
                name="chemicalsUsed"
                label="Chemicals used"
                variant="filled"
                value={data.values.chemicalsUsed}
                onChange={data.handleChange}
                onBlur={data.handleBlur}
              />
            </div>
            <TextField
              id=""
              name="additionalComments"
              label="Additional comments"
              variant="filled"
              value={data.values.additionalComments}
              onChange={data.handleChange}
              onBlur={data.handleBlur}
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
                  <tr key={index} className="bg-gray-50 shadow border-b ">
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
                        onChange={(e) => handleEmployeeUpdate(e, index)}
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
                        onChange={(e) => handleEmployeeUpdate(e, index)}
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
                        onChange={(e) => handleEmployeeUpdate(e, index)}
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
                  <tr key={index} className="bg-gray-50 shadow border-b ">
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
                        onChange={(e) => handleAnalysisChange(e, index)}
                        value={myAnalysis.activity}
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
                        onChange={(e) => handleAnalysisChange(e, index)}
                        value={myAnalysis.potentialHazards}
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
                        onChange={(e) => handleAnalysisChange(e, index)}
                        value={myAnalysis.proceduresEquipmentTraining}
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
                    >
                      Add Analysis
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </AccordionDetails>
      </Accordion>
      <Button
        type="submit"
        sx={{
          marginTop: '10px',
        }}
        variant="contained"
      >
        Submit
      </Button>
    </form>
  );
}

export default Form;
