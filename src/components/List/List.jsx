import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import moment from "moment";
import axios from "axios";
import { useEffect, useState, useReducer } from "react";
import ViewEditReport from "../ViewEditReport/ViewEditReport";
import { GoDesktopDownload } from "react-icons/go";
import CustomeModal from "../CustomModal/CustomeModal";
function List() {
	const [reports, setReports] = useState([]);
	const [viewReport, setViewReport] = useState(false);
	const [reportID, setReportID] = useState();
	const [updateList, setUpdateList] = useReducer((x) => x + 1, 0);
	const [openModal, setOpenModal] = useState(false);
	const handleOpenCloseModal = () => {
		setOpenModal(!openModal);
	};

	const handleViewReport = () => {
		setViewReport(!viewReport);
	};
	const handleUpdateList = () => {
		setUpdateList();
	};
	const handleDeleteReport = (id) => {
		axios
			.delete(`http://localhost:5000/api/delete/${id}`)
			.then((res) => {
				handleUpdateList();
			})
			.catch((err) => console.error(err.message));
	};
	const columns = [
		{ field: "id", headerName: "ID", width: 30 },
		{
			field: "fullName",
			headerName: "Full Name",
			width: 100,
			hideSortIcon: true,
		},
		{ field: "superVisorName", headerName: "Supervisor", width: 100 },
		{ field: "companyName", headerName: "Company Name", width: 100 },
		{ field: "projectName", headerName: "Project Name", width: 100 },
		{ field: "projectDate", headerName: "Project Date", width: 100 },
		{ field: "departmentOrUnit", headerName: "Department/Unit", width: 100 },
		{ field: "location", headerName: "location", width: 150 },
		{
			field: "PDF",
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
			field: "View",
			width: 150,
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
							handleViewReport();
							setReportID(dataIndex.id);
						}}
					>
						View/Edit
					</Button>
				);
			},
		},

		{
			field: "Delete",
			renderCell: (dataIndex) => {
				return (
					<Button
						sx={{
							background: "#cb2828",
							":hover": {
								background: "#ad3333",
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
			.get("http://localhost:5000/api/getAllReports")
			.then((res) => {
				res.data.map((report) => {
					return (report.projectDate = moment(report.projectDate).format(
						"MM/DD/YYYY"
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
			.delete("http://localhost:5000/api/deleteAll/")
			.then((res) => {
				console.log("Deleted All");
				setUpdateList();
			})
			.catch((err) => {
				console.error(err.message);
			});
	};
	return (
		<div className="container ml-auto mr-auto">
			<Button
				sx={{
					background: "#cb2828",
					marginBottom: "15px",
					padding: "10px",
					":hover": {
						background: "#ad3333",
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
				title={"Warning"}
				description="You are about to delete all of the reports. Please click confirm to
				delete all otherwise click cancel"
				actionButton={"Delete All"}
				actionButtonFunction={handleDeleteAllReports}
			/>

			{viewReport && (
				<ViewEditReport
					id={reportID}
					isOpen={viewReport}
					closeModal={handleViewReport}
					handleUpdateList={handleUpdateList}
				/>
			)}
			<div
				style={{ height: 400, width: "100%" }}
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
