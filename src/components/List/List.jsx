import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

import axios from "axios";
import { useEffect, useState } from "react";
import ViewReport from "../ViewReport/ViewReport";
function List() {
	const [viewReport, setViewReport] = useState(false);
	const [reportID, setReportID] = useState();
	const handleViewReport = () => {
		setViewReport(!viewReport);
	};
	const columns = [
		{ field: "id", headerName: "ID", width: 70 },
		{ field: "fullName", headerName: "Full Name", width: 130 },
		{ field: "superVisorName", headerName: "Supervisor", width: 130 },
		{ field: "companyName", headerName: "Company Name", width: 130 },
		{ field: "projectName", headerName: "Project Name", width: 130 },
		{ field: "projectDate", headerName: "Project Date", width: 130 },
		{ field: "departmentOrUnit", headerName: "Department/Unit", width: 130 },
		{ field: "location", headerName: "location", width: 130 },
		{
			field: "View",
			renderCell: (dataIndex) => {
				return (
					<Button
						name="view"
						sx={{
							background: "#439243",
							":hover": {
								background: "#469746",
							},
						}}
						variant="contained"
						onClick={() => {
							handleViewReport(dataIndex.id);
							setReportID(dataIndex.id);
						}}
					>
						View
					</Button>
				);
			},
		},
		{
			field: "Print",
			renderCell: (cellValue) => {
				return (
					<Button
						sx={{
							background: "#439243",
							":hover": {
								background: "#469746",
							},
						}}
						variant="contained"
						onClick={(e) => {
							e.preventDefault();
						}}
					>
						Print
					</Button>
				);
			},
		},
	];

	const [reports, setReports] = useState([]);
	useEffect(() => {
		axios
			.get("http://localhost:5000/api/getAllReports")
			.then((res) => {
				setReports(res.data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, []);

	return (
		<div
			style={{ height: 400, width: "100%" }}
			className="container ml-auto mr-auto"
		>
			<DataGrid
				rows={reports}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
			/>
			{viewReport && <ViewReport id={reportID} />}
		</div>
	);
}

export default List;
