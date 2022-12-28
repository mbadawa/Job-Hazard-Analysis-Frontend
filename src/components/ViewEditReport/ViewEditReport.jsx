import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Button from "@mui/material/Button";
import "./ViewEditReport.css";
import { useFormik } from "formik";
import schema from "../../utils/ValidationSchema";
import InitialValues from "../../utils/InitialValues";
import AnalysisForm from "../AnalysisForm/AnalysisForm";
import EmployeesForm from "../EmployeesForm/EmployeesForm";
import GeneralInformationsForm from "../GeneralInformationsForm/GeneralInformationsForm";
function ViewReport({
	id,
	handleShowSuccessAlert,
	setHideApiErrorMessages,
	handleHideAllApiErrorMessages,
	setSuccessMessage,
	setApiErrorMessage,
	handleUpdateList,
}) {
	const [expanded, setExpanded] = useState("generalInfo");
	const [disableFields, setDisableFields] = useState(true);
	const [reportData, setReportData] = useState();
	const handleAccordionPanel = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};
	const [employee, setEmployee] = useState([
		{ employeeName: "", employeeID: "", employeeCertifications: "" },
	]);

	const [analysisArray, setAnalysisArray] = useState([
		{ activity: "", potentialHazards: "", proceduresEquipmentTraining: "" },
	]);

	const handleUnDisableFields = () => {
		setDisableFields(!disableFields);
	};
	const handleCloseModal = () => {
		document.querySelector(".dialog_container").style.display = "none";
	};

	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/findreport/${id}`)
			.then((res) => {
				if (res.data) {
					let { employees, analysis, indoorOrOutdoor } = res?.data;
					res.data.indoorOrOutdoor = JSON.parse(indoorOrOutdoor);
					setReportData(res.data);
					setEmployee(JSON.parse(employees));
					setAnalysisArray(JSON.parse(analysis));
				}
			})
			.catch((err) => console.error(err.message));
	}, [id]);

	//   Assigining employees and analysis inputs to the initalvalues object

	const data = useFormik({
		enableReinitialize: true,
		initialValues: reportData || InitialValues,
		validateOnChange: false,
		validationSchema: schema,
		onSubmit: () => {
			const { indoorOrOutdoor } = data.values;
			data.values.employees = JSON.stringify(employee);
			data.values.analysis = JSON.stringify(analysisArray);
			data.values.indoorOrOutdoor = JSON.stringify(indoorOrOutdoor);
			axios
				.put(`http://localhost:5000/api/update/${id}`, data.values)
				.then((res) => {
					console.log(res);
					handleShowSuccessAlert();
					handleHideAllApiErrorMessages();
					setSuccessMessage("JHA Report been updated!");
				})
				.catch((err) => {
					setApiErrorMessage(err.response.data.errors);
					setHideApiErrorMessages(true);
					console.error(err);
				});
			handleUpdateList();
			handleCloseModal();
			handleUnDisableFields();
		},
	});

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		setExpanded("generalInfo");
		handleAccordionPanel("generalInfo");
	}, [data.isSubmitting]);
	return (
		<div className="dialog_container">
			<form
				onSubmit={data.handleSubmit}
				className="container bg-gray-100 mb-3 absolute z-40  left-0 right-0 top-3 bottom-0 w-8/12 m-auto overflow-x-hidden "
			>
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
							sx={{ padding: "10px" }}
							expandIcon={<ExpandMoreIcon />}
						>
							<Typography sx={{ color: "black" }}>
								General Informations
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<GeneralInformationsForm
								data={data}
								disableFields={disableFields}
							/>
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
							<EmployeesForm
								setEmployee={setEmployee}
								employee={employee}
								disableFields={disableFields}
							/>
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
							<AnalysisForm
								analysisArray={analysisArray}
								setAnalysisArray={setAnalysisArray}
								disableFields={disableFields}
							/>
						</AccordionDetails>
					</Accordion>
					<div className="flex items-center gap-2 mt-5">
						<Button disabled={disableFields} variant="contained" type="submit">
							Save
						</Button>
						<Button
							sx={{ color: "#374151", padding: "10px" }}
							variant="text"
							onClick={() => {
								document.querySelector(".dialog_container").style.display =
									"none";
								setDisableFields(true);
							}}
						>
							Close
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default ViewReport;
