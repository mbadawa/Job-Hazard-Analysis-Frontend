import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Title from "../components/Title/Title";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Helmet, HelmetProvider } from "react-helmet-async";

import Button from "@mui/material/Button";
import { useState, useEffect } from "react";

import { useFormik } from "formik";
import schema from "../utils/ValidationSchema";
import InitialValues from "../utils/InitialValues";
import MuiAlert from "@mui/material/Alert";
import { IoClose } from "react-icons/io5";
import AnalysisForm from "../components/AnalysisForm/AnalysisForm";
import EmployeesForm from "../components/EmployeesForm/EmployeesForm";
import GeneralInformationsForm from "../components/GeneralInformationsForm/GeneralInformationsForm";
import Footer from "../components/Footer/Footer";

function NewTask() {
	const [successAlert, setSuccessAlert] = useState(false);
	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});
	const handleShowSuccessAlert = () => {
		setSuccessAlert(!successAlert);
	};

	//   Displays API side validation
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
	const [expanded, setExpanded] = useState("generalInfo");
	const handleAccordionPanel = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	// Handle employee section dynamic inputs etc
	const [employee, setEmployee] = useState([
		{ employeeName: "", employeeID: "", employeeCertifications: "" },
	]);

	const [analysisArray, setAnalysisArray] = useState([
		{ activity: "", potentialHazards: "", proceduresEquipmentTraining: "" },
	]);
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
				{ employeeName: "", employeeID: "", employeeCertifications: "" },
			]);
			setAnalysisArray([
				{ activity: "", potentialHazards: "", proceduresEquipmentTraining: "" },
			]);

			axios
				.post("http://localhost:5000/api/createJHA", data.values)
				.then(function (res) {
					handleHideAllApiErrorMessages();
					handleShowSuccessAlert();
				})
				.catch(function (err) {
					setHideApiErrorMessages(true);
					setApiErrorMessage(err.response.data.errors);
				});
		},
	});

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		setExpanded("generalInfo");
		handleAccordionPanel("generalInfo");
	}, [data.isSubmitting]);
	return (
		<div>
			<HelmetProvider>
				<Helmet>
					<meta charSet="utf-8" />
					<title>Create new job hazard analysis</title>
				</Helmet>
			</HelmetProvider>

			<Navbar />
			<Title title="New Job Hazard Analysis" />
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
						<GeneralInformationsForm data={data} disableFields={false} />
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
							disableFields={false}
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
							setAnalysisArray={setAnalysisArray}
							analysisArray={analysisArray}
							disableFields={false}
						/>
					</AccordionDetails>
				</Accordion>
				<Button
					type="submit"
					sx={{
						marginTop: "10px",
					}}
					variant="contained"
				>
					Submit
				</Button>
			</form>
			<Footer />
		</div>
	);
}

export default NewTask;
