import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function EmployeesForm(props) {
	const handleAddEmployee = () => {
		props.setEmployee([
			...props.employee,
			{ employeeName: "", employeeID: "", employeeCertifications: "" },
		]);
	};
	const handleEmployeeUpdate = (e, index) => {
		const { name, value } = e.target;
		const list = [...props.employee];
		list[index][name] = value;
		props.setEmployee(list);
	};
	const handleRemoveEmployee = (index) => {
		const list = [...props.employee];
		list.splice(index, 1);
		props.setEmployee(list);
	};
	return (
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
					{props.employee.map((object, index) => (
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
									disabled={props.disableFields}
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
									disabled={props.disableFields}
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
									disabled={props.disableFields}
								/>
								{props.employee.length > 1 && props.disableFields === false && (
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
								disabled={props.disableFields}
							>
								Add Employee
							</Button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default EmployeesForm;
