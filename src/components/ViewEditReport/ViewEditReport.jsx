import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
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
import "./ViewEditReport.css";
function ViewReport(props) {
	const [expanded, setExpanded] = useState("generalInfo");
	const [disableFields, setDisableFields] = useState(true);
	const handleAccordionPanel = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};
	const [employee, setEmployee] = useState([
		{ employeeName: "", employeeID: "", employeeCertifications: "" },
	]);

	const [analysisArray, setAnalysisArray] = useState([
		{ activity: "", potentialHazards: "", proceduresEquipmentTraining: "" },
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
	const [data, setData] = useState({});

	const handleUnDisableFields = () => {
		setDisableFields(!disableFields);
	};
	const handleCloseModal = () => {
		props.closeModal();
	};
	const handleUpdateList = () => {
		props.handleUpdateList();
	};
	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/findreport/${props.id}`)
			.then((res) => {
				let { employees, analysis } = res.data;
				employees = JSON.parse(employees);
				analysis = JSON.parse(analysis);
				setEmployee(employees);
				setAnalysisArray(analysis);
				setData(res.data);
			})
			.catch((err) => console.error(err.message));
	}, [props.id]);

	const handleInformationUpdate = (e) => {
		const { name, value } = e.target;
		setData((prev) => {
			return { ...prev, [name]: value };
		});
		console.log(data);
	};

	const handleSaveData = () => {
		data.employees = JSON.stringify(employee);
		data.analysis = JSON.stringify(analysisArray);
		axios
			.put(`http://localhost:5000/api/update/${props.id}`, data)
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
		handleUpdateList();
		console.log(data);
	};
	return (
		<div className="dialog_container">
			{props.isOpen && (
				<div className="container bg-gray-100 mb-3 absolute z-40  left-0 right-0 top-3 bottom-0 w-8/12 m-auto overflow-x-hidden ">
					<p className="bg-gray-600 text-white p-3 font-bold text-center sticky top-0 z-40">
						View/Edit Report
					</p>
					<div
						className="flex flex-col p-3 relative container ml-auto mr-auto mb-5"
						action=""
					>
						<Button
							variant="contained"
							sx={{
								background: "#439243",
								marginBottom: "10px",
								display: "flex",
								justifyContent: "center",
								marginLeft: "auto",
								":hover": {
									background: "#469746",
								},
							}}
							onClick={(e) => {
								e.preventDefault();
								handleUnDisableFields();
							}}
						>
							{disableFields ? "Edit" : "Cancel Edit"}
						</Button>
						<Accordion
							expanded={expanded === "generalInfo"}
							onChange={handleAccordionPanel("generalInfo")}
						>
							<AccordionSummary
								sx={{ paddingRight: "2px" }}
								expandIcon={<ExpandMoreIcon />}
							>
								<Typography sx={{ color: "black" }}>
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
											label="Full Name"
											name="fullName"
											variant="filled"
											placeholder="Please enter your name"
											value={data.fullName || ""}
											disabled={disableFields}
											onChange={(e) => handleInformationUpdate(e)}
										/>
										<TextField
											className="w-full"
											name="superVisorName"
											label="Supervisor Name"
											variant="filled"
											value={data.superVisorName || ""}
											disabled={disableFields}
											onChange={(e) => handleInformationUpdate(e)}
										/>
									</div>
									<div className="md:flex grid grid-rows-2 gap-3">
										<TextField
											className="w-full"
											name="companyName"
											label="Company Name"
											variant="filled"
											value={data.companyName || ""}
											disabled={disableFields}
											onChange={(e) => handleInformationUpdate(e)}
										/>
										<TextField
											className="w-full"
											name="projectName"
											label="Project Name"
											variant="filled"
											value={data.projectName || ""}
											disabled={disableFields}
											onChange={(e) => handleInformationUpdate(e)}
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
												value={data.projectDate || ""}
												onChange={(date) =>
													handleInformationUpdate({
														target: { value: date, name: "projectDate" },
													})
												}
												disabled={disableFields}
												renderInput={(params) => <TextField {...params} />}
											/>
										</LocalizationProvider>
										<TextField
											className="w-full"
											name="operation"
											label="Operation"
											variant="filled"
											value={data.operation || ""}
											onChange={(e) => handleInformationUpdate(e)}
											disabled={disableFields}
										/>
									</div>
									<div className="md:flex grid grid-rows-2 gap-3">
										<TextField
											className="w-full"
											name="departmentOrUnit"
											label="Department/Unit"
											variant="filled"
											value={data.departmentOrUnit || ""}
											onChange={(e) => handleInformationUpdate(e)}
											disabled={disableFields}
										/>
										<TextField
											className="w-full"
											name="location"
											label="Location"
											variant="filled"
											value={data.location || ""}
											onChange={(e) => handleInformationUpdate(e)}
											disabled={disableFields}
										/>
										<FormControlLabel
											control={<Checkbox />}
											label="Indoor"
											value={"indoor"}
											onChange={(e) => handleInformationUpdate(e)}
											checked={data.indoorOrOutdoor === "indoor" ? true : false}
											name="indoorOrOutdoor"
											disabled={disableFields}
										/>
										<FormControlLabel
											control={<Checkbox />}
											label="Outdoor"
											value={"outdoor"}
											checked={
												data.indoorOrOutdoor === "outdoor" ? true : false
											}
											onChange={(e) => handleInformationUpdate(e)}
											name="indoorOrOutdoor"
											disabled={disableFields}
										/>
									</div>
									<div className="md:flex grid grid-rows-2 gap-3">
										<TextField
											className="w-full"
											name="ppeRequired"
											label="PPE Required"
											variant="filled"
											onChange={(e) => handleInformationUpdate(e)}
											value={data.ppeRequired || ""}
											disabled={disableFields}
										/>
										<TextField
											className="w-full"
											name="trainingRequired"
											label="Training required"
											variant="filled"
											value={data.trainingRequired || ""}
											onChange={(e) => handleInformationUpdate(e)}
											disabled={disableFields}
										/>
										<TextField
											className="w-full"
											name="equipmentUsed"
											label="Equipment used"
											variant="filled"
											value={data.equipmentUsed || ""}
											onChange={(e) => handleInformationUpdate(e)}
											disabled={disableFields}
										/>
										<TextField
											className="w-full"
											name="chemicalsUsed"
											label="Chemicals used"
											variant="filled"
											value={data.chemicalsUsed || ""}
											onChange={(e) => handleInformationUpdate(e)}
											disabled={disableFields}
										/>
									</div>
									<TextField
										name="additionalComments"
										label="Additional comments"
										variant="filled"
										value={data.additionalComments || ""}
										onChange={(e) => handleInformationUpdate(e)}
										disabled={disableFields}
									/>
								</Box>
							</AccordionDetails>
						</Accordion>
						<Accordion
							expanded={expanded === "employees"}
							onChange={handleAccordionPanel("employees")}
						>
							<AccordionSummary
								sx={{ paddingRight: "2px" }}
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
															label="Full Name"
															variant="filled"
															className="w-full"
															autoComplete="off"
															name="employeeName"
															value={object.employeeName || ""}
															onChange={(e) => handleEmployeeUpdate(e, index)}
															disabled={disableFields}
														/>
													</th>
													<td className="py-4 px-6">
														<TextField
															label="Employee ID"
															variant="filled"
															className="w-full"
															autoComplete="off"
															name="employeeID"
															value={object.employeeID || ""}
															onChange={(e) => handleEmployeeUpdate(e, index)}
															disabled={disableFields}
														/>
													</td>
													<td className="py-4 px-6 flex items-center gap-3">
														<TextField
															label="Employee Certifications"
															placeholder="List all employee certifications using , to seprate"
															variant="filled"
															className="w-full"
															autoComplete="off"
															name="employeeCertifications"
															value={object.employeeCertifications || ""}
															onChange={(e) => handleEmployeeUpdate(e, index)}
															disabled={disableFields}
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
							expanded={expanded === "analysis"}
							onChange={handleAccordionPanel("analysis")}
						>
							<AccordionSummary
								sx={{ paddingRight: "2px" }}
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
															label="Activity"
															variant="filled"
															className="w-full"
															autoComplete="off"
															name="activity"
															onChange={(e) => handleAnalysisChange(e, index)}
															value={myAnalysis.activity || ""}
															disabled={disableFields}
														/>
													</th>
													<td className="py-4 px-6">
														<TextField
															label="Potential Hazards"
															variant="filled"
															className="w-full"
															autoComplete="off"
															name="potentialHazards"
															onChange={(e) => handleAnalysisChange(e, index)}
															value={myAnalysis.potentialHazards || ""}
															disabled={disableFields}
														/>
													</td>
													<td className="py-4 px-6 flex items-center gap-3">
														<TextField
															label="Procedures/Equipment/Training"
															variant="filled"
															className="w-full"
															autoComplete="off"
															name="proceduresEquipmentTraining"
															onChange={(e) => handleAnalysisChange(e, index)}
															value={
																myAnalysis.proceduresEquipmentTraining || ""
															}
															disabled={disableFields}
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
									handleSaveData();
									handleCloseModal();
								}}
							>
								Save
							</Button>
							<Button
								sx={{ color: "#374151", padding: "10px" }}
								variant="text"
								onClick={handleCloseModal}
							>
								Close
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ViewReport;
