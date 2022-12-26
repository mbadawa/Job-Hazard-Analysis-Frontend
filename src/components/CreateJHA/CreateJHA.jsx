import React from "react";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Button from "@mui/material/Button";

import { useState } from "react";
function Form() {
	const [expanded, setExpanded] = useState("generalInfo");
	const handleAccordionPanel = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	// Handles All the General Information inputs
	const [generalInfo, setGeneralInfo] = useState({
		fullName: "",
		superVisorName: "",
		companyName: "",
		projectName: "",
		projectDate: new Date().toLocaleDateString(),
		operation: "",
		departmentOrUnit: "",
		location: "",
		indoorOrOutdoor: "",
		ppeRequired: "",
		trainingRequired: "",
		equipmentUsed: "",
		chemicalsUsed: "",
		additionalComments: "",
	});
	const handleGeneralInformationChange = (e) => {
		const { name, value } = e.target;
		setGeneralInfo((prev) => {
			return { ...prev, [name]: value };
		});
	};

	// Handle employee section dynamic inputs etc
	const [employee, setEmployee] = useState([
		{ employeeName: "", employeeID: "", employeeCertifications: "" },
	]);
	const handleAddEmployee = () => {
		setEmployee([...employee, { employeeName: "", employeeID: "" }]);
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
		{ activity: "", potentialHazards: "", proceduresEquipmentTraining: "" },
	]);
	const handleAddAnalysis = () => {
		setAnalysisArray([
			...analysisArray,
			{ activity: "", potentialHazards: "", proceduresEquipmentTraining: "" },
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

	// SUBMITS FORM
	function submitForm() {
		generalInfo.employees = JSON.stringify(employee);
		generalInfo.analysis = JSON.stringify(analysisArray);
		axios
			.post("http://localhost:5000/api/createJHA", generalInfo)
			.then(function (res) {
				console.log(res);
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	return (
		<form className="container ml-auto mr-auto mt-5">
			<Accordion
				expanded={expanded === "generalInfo"}
				onChange={handleAccordionPanel("generalInfo")}
			>
				<AccordionSummary
					sx={{ padding: "10px" }}
					expandIcon={<ExpandMoreIcon />}
				>
					<Typography sx={{ color: "black" }}>General Informations</Typography>
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
								onChange={(e) => handleGeneralInformationChange(e)}
								value={generalInfo.fullName}
							/>
							<TextField
								className="w-full"
								id=""
								name="superVisorName"
								label="Supervisor Name"
								variant="filled"
								onChange={(e) => handleGeneralInformationChange(e)}
								value={generalInfo.superVisorName}
							/>
						</div>
						<div className="md:flex grid grid-rows-2 gap-3">
							<TextField
								className="w-full"
								id=""
								name="companyName"
								label="Company Name"
								variant="filled"
								onChange={(e) => handleGeneralInformationChange(e)}
								value={generalInfo.companyName}
							/>
							<TextField
								className="w-full"
								id=""
								name="projectName"
								label="Project Name"
								variant="filled"
								onChange={(e) => handleGeneralInformationChange(e)}
								value={generalInfo.projectName}
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
									TextFieldProps={{ variant: "filled" }}
									name="projectDate"
									value={generalInfo.projectDate}
									onChange={(date) =>
										handleGeneralInformationChange({
											target: { value: date, name: "projectDate" },
										})
									}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
							<TextField
								className="w-full"
								id=""
								name="operation"
								label="Operation"
								variant="filled"
								onChange={(e) => handleGeneralInformationChange(e)}
								value={generalInfo.operation}
							/>
						</div>
						<div className="md:flex grid grid-rows-2 gap-3">
							<TextField
								className="w-full"
								id=""
								name="departmentOrUnit"
								label="Department/Unit"
								variant="filled"
								onChange={(e) => handleGeneralInformationChange(e)}
								value={generalInfo.departmentOrUnit}
							/>
							<TextField
								className="w-full"
								id=""
								name="location"
								label="Location"
								variant="filled"
								onChange={(e) => handleGeneralInformationChange(e)}
								value={generalInfo.location}
							/>
							<FormControlLabel
								control={<Checkbox />}
								label="Indoor"
								value={"indoor"}
								name="indoorOrOutdoor"
								checked={
									generalInfo.indoorOrOutdoor === "indoor" ? true : false
								}
								onChange={(e) => handleGeneralInformationChange(e)}
							/>
							<FormControlLabel
								control={<Checkbox />}
								label="Outdoor"
								value={"outdoor"}
								name="indoorOrOutdoor"
								checked={
									generalInfo.indoorOrOutdoor === "outdoor" ? true : false
								}
								onChange={(e) => handleGeneralInformationChange(e)}
							/>
						</div>
						<div className="md:flex grid grid-rows-2 gap-3">
							<TextField
								className="w-full"
								id=""
								name="ppeRequired"
								label="PPE Required"
								variant="filled"
								onChange={(e) => handleGeneralInformationChange(e)}
								value={generalInfo.ppeRequired}
							/>
							<TextField
								className="w-full"
								id=""
								name="trainingRequired"
								label="Training Required"
								variant="filled"
								onChange={(e) => handleGeneralInformationChange(e)}
								value={generalInfo.trainingRequired}
							/>
							<TextField
								className="w-full"
								id=""
								name="equipmentUsed"
								label="Equipment used"
								variant="filled"
								onChange={(e) => handleGeneralInformationChange(e)}
								value={generalInfo.equipmentUsed}
							/>
							<TextField
								className="w-full"
								id=""
								name="chemicalsUsed"
								label="Chemicals used"
								variant="filled"
								onChange={(e) => handleGeneralInformationChange(e)}
								value={generalInfo.chemicalsUsed}
							/>
						</div>
						<TextField
							id=""
							name="additionalComments"
							label="Additional comments"
							variant="filled"
							onChange={(e) => handleGeneralInformationChange(e)}
							value={generalInfo.additionalComments}
						/>
					</Box>
				</AccordionDetails>
			</Accordion>
			<Accordion
				expanded={expanded === "employees"}
				onChange={handleAccordionPanel("employees")}
			>
				<AccordionSummary
					sx={{ padding: "10px" }}
					expandIcon={<ExpandMoreIcon />}
				>
					<Typography sx={{ color: "black" }}>Employees</Typography>
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
													sx={{ color: "red" }}
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
												marginTop: "10px",
												background: "#439243",
												":hover": {
													background: "#469746",
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
				expanded={expanded === "analysis"}
				onChange={handleAccordionPanel("analysis")}
			>
				<AccordionSummary
					sx={{ padding: "10px" }}
					expandIcon={<ExpandMoreIcon />}
				>
					<Typography sx={{ color: "black" }}>Analysis</Typography>
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
													sx={{ color: "red" }}
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
												marginTop: "10px",
												background: "#439243",
												":hover": {
													background: "#469746",
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
					marginTop: "10px",
				}}
				variant="contained"
				onClick={(e) => {
					e.preventDefault();
					submitForm();
				}}
			>
				Submit
			</Button>
		</form>
	);
}

export default Form;
