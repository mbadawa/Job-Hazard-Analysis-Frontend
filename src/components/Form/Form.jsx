import React from 'react';
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

import dayjs from 'dayjs';

import Button from '@mui/material/Button';

import { useState } from 'react';
function Form() {
  const [expanded, setExpanded] = React.useState('generalInfo');

  const handleAccordionPanel = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const [employees, setEmployees] = useState([
    { employeeName: '', employeeID: '', employeeCertifications: '' },
  ]);
  const [analysis, setAnalysis] = useState([
    { activity: '', potentialHazards: '', proceduresEquipmentTraining: '' },
  ]);
  const handleAddEmployee = () => {
    setEmployees([...employees, { employeeName: '', employeeID: '' }]);
  };
  const handleRemoveEmployee = (index) => {
    const list = [...employees];
    list.splice(index, 1);
    setEmployees(list);
  };
  const handleEmployeeUpdate = (e, index) => {
    const { name, value } = e.target;
    const list = [...employees];
    list[index][name] = value;
    setEmployees(list);
  };

  const handleAddAnalysis = () => {
    setAnalysis([
      ...analysis,
      { activity: '', potentialHazards: '', proceduresEquipmentTraining: '' },
    ]);
  };
  const handleRemoveAnalysis = (index) => {
    const list = [...analysis];
    list.splice(index, 1);
    setAnalysis(list);
  };
  const handleAnalysisChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...analysis];
    list[index][name] = value;
    setAnalysis(list);
  };
  const [value, setValue] = React.useState(new Date().toLocaleDateString());

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <form className="container ml-auto mr-auto mt-5" action="">
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
              <TextField
                className="w-full"
                id=""
                label="Full Name"
                variant="filled"
                placeholder="Please enter your name"
              />
              <TextField
                className="w-full"
                id=""
                label="Supervisor Name"
                variant="filled"
              />
            </div>
            <div className="md:flex grid grid-rows-2 gap-3">
              <TextField
                className="w-full"
                id=""
                label="Company Name"
                variant="filled"
              />
              <TextField
                className="w-full"
                id=""
                label="Project Name"
                variant="filled"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  className="w-full"
                  label="Project Date"
                  inputFormat="MM/DD/YYYY"
                  variant="filled"
                  TextFieldProps={{ variant: 'filled' }}
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <TextField
                className="w-full"
                id=""
                label="Operation"
                variant="filled"
              />
            </div>
            <div className="md:flex grid grid-rows-2 gap-3">
              <TextField
                className="w-full"
                id=""
                label="Department/Unit"
                variant="filled"
              />
              <TextField
                className="w-full"
                id=""
                label="Location"
                variant="filled"
              />
              <FormControlLabel control={<Checkbox />} label="Indoor" />
              <FormControlLabel control={<Checkbox />} label="Outdoor" />
            </div>
            <div className="md:flex grid grid-rows-2 gap-3">
              <TextField
                className="w-full"
                id=""
                label="Training required"
                variant="filled"
              />
              <TextField
                className="w-full"
                id=""
                label="Equipment used"
                variant="filled"
              />
              <TextField
                className="w-full"
                id=""
                label="Chemicals used"
                variant="filled"
              />
            </div>
            <TextField id="" label="Additional comments" variant="filled" />
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
          <div class="overflow-x-auto relative">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-100 ">
                <tr>
                  <th scope="col" class="py-3 px-6">
                    Full Name
                  </th>

                  <th scope="col" class="py-3 px-6">
                    Employee ID
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Certifications
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {employees.map((employee, index) => (
                  <tr key={index} class="bg-gray-50 shadow border-b ">
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                    >
                      <TextField
                        id=""
                        label="Full Name"
                        variant="filled"
                        className="w-full"
                        autoComplete="off"
                        name="employeeName"
                        value={employee.employeeName}
                        onChange={(e) => handleEmployeeUpdate(e, index)}
                      />
                    </th>
                    <td class="py-4 px-6">
                      <TextField
                        id=""
                        label="Employee ID"
                        variant="filled"
                        className="w-full"
                        autoComplete="off"
                        name="employeeID"
                        value={employee.employeeID}
                        onChange={(e) => handleEmployeeUpdate(e, index)}
                      />
                    </td>
                    <td class="py-4 px-6 flex items-center gap-3">
                      <TextField
                        id=""
                        label="Employee Certifications"
                        placeholder="List all employee certifications using , to seprate"
                        variant="filled"
                        className="w-full"
                        autoComplete="off"
                        name="employeeCertifications"
                        value={employee.employeeCertifications}
                        onChange={(e) => handleEmployeeUpdate(e, index)}
                      />
                      {employees.length > 1 && (
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
          <div class="overflow-x-auto relative">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-100 ">
                <tr>
                  <th scope="col" class="py-3 px-6">
                    Activity
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Potential Hazards
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Procedures/Equipment/Training
                  </th>
                </tr>
              </thead>
              <tbody>
                {analysis.map((myAnalysis, index) => (
                  <tr key={index} class="bg-gray-50 shadow border-b ">
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
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
                    <td class="py-4 px-6">
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
                    <td class="py-4 px-6 flex items-center gap-3">
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
                      {analysis.length > 1 && (
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
              </tbody>
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
                Add Employee
              </Button>
            </table>
          </div>
        </AccordionDetails>
      </Accordion>
      <Button
        sx={{
          marginTop: '10px',
        }}
        variant="contained"
        onClick={(e) => {
          e.preventDefault();
          handleAddAnalysis();
        }}
      >
        Submit
      </Button>
    </form>
  );
}

export default Form;

{
  /* <span className="flex flex-col gap-2">
<label htmlFor="task_date" className="font-bold">
  Date
</label>
<span className="flex items-center bg-gray-100 p-3">
  <Flatpickr
    id="task_date"
    className="bg-gray-100 focus:outline-none"
    placeholder="MM/DD/YYYY"
    options={{
      minDate: currentDate,
      allowInput: false,
      dateFormat: 'm/d/Y',
    }}
    value={date}
    onChange={([date]) => {
      this.setState({ date });
    }}
  />
  <BsCalendar3 />
</span>
</span> */
}
