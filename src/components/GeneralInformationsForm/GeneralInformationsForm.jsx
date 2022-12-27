import React from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function GeneralInformationsForm(props) {
	return (
		<div className="flex flex-col gap-7">
			<div className="md:flex grid grid-rows-2 gap-3">
				<span className="flex flex-col gap-2 w-full">
					<TextField
						className="w-full"
						id=""
						label="Full Name"
						name="fullName"
						variant="filled"
						placeholder="Please enter your name"
						value={props.data.values.fullName}
						onChange={props.data.handleChange}
						onBlur={props.data.handleBlur}
						error={
							props.data.touched.fullName && props.data.errors.fullName
								? true
								: false
						}
						disabled={props.disableFields}
						autoComplete="off"
					/>
					{props.data.touched.fullName && props.data.errors.fullName ? (
						<p className="text-red-500 text-sm">{props.data.errors.fullName}</p>
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
						value={props.data.values.superVisorName}
						onChange={props.data.handleChange}
						onBlur={props.data.handleBlur}
						error={
							props.data.touched.superVisorName &&
							props.data.errors.superVisorName
								? true
								: false
						}
						disabled={props.disableFields}
						autoComplete="off"
					/>
					{props.data.touched.superVisorName &&
					props.data.errors.superVisorName ? (
						<p className="text-red-500 text-sm">
							{props.data.errors.superVisorName}
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
						value={props.data.values.companyName}
						onChange={props.data.handleChange}
						onBlur={props.data.handleBlur}
						error={
							props.data.touched.companyName && props.data.errors.companyName
								? true
								: false
						}
						disabled={props.disableFields}
						autoComplete="off"
					/>
					{props.data.touched.companyName && props.data.errors.companyName ? (
						<p className="text-red-500 text-sm">
							{props.data.errors.companyName}
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
						value={props.data.values.projectName}
						onChange={props.data.handleChange}
						onBlur={props.data.handleBlur}
						error={
							props.data.touched.projectName && props.data.errors.projectName
								? true
								: false
						}
						disabled={props.disableFields}
						autoComplete="off"
					/>
					{props.data.touched.projectName && props.data.errors.projectName ? (
						<p className="text-red-500 text-sm">
							{props.data.errors.projectName}
						</p>
					) : (
						<p className="text-gray-400 text-sm">Required</p>
					)}
				</span>
				<LocalizationProvider name="projectDate" dateAdapter={AdapterDayjs}>
					<span className="flex flex-col gap-2 w-full">
						<DesktopDatePicker
							className="w-full"
							label="Project Date"
							inputFormat="MM/DD/YYYY"
							variant="filled"
							TextFieldProps={{ variant: "filled" }}
							name="projectDate"
							value={props.data.values.projectDate}
							onChange={(date) =>
								props.data.handleChange({
									target: { value: date, name: "projectDate" },
								})
							}
							disabled={props.disableFields}
							onBlur={props.data.handleBlur}
							autoComplete="off"
							renderInput={(params) => <TextField {...params} />}
						/>
						{props.data.touched.projectDate && props.data.errors.projectDate ? (
							<p className="text-red-500 text-sm">Please enter a valid date</p>
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
						value={props.data.values.operation}
						onChange={props.data.handleChange}
						onBlur={props.data.handleBlur}
						error={
							props.data.touched.operation && props.data.errors.operation
								? true
								: false
						}
						disabled={props.disableFields}
						autoComplete="off"
					/>
					{props.data.touched.operation && props.data.errors.operation ? (
						<p className="text-red-500 text-sm">
							{props.data.errors.operation}
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
						value={props.data.values.departmentOrUnit}
						onChange={props.data.handleChange}
						onBlur={props.data.handleBlur}
						error={
							props.data.touched.departmentOrUnit &&
							props.data.errors.departmentOrUnit
								? true
								: false
						}
						disabled={props.disableFields}
						autoComplete="off"
					/>
					{props.data.touched.departmentOrUnit &&
					props.data.errors.departmentOrUnit ? (
						<p className="text-red-500 text-sm">
							{props.data.errors.departmentOrUnit}
						</p>
					) : (
						<p className="text-gray-400 text-sm">Required</p>
					)}
				</span>
				<div className="flex items-center gap-3  w-full">
					<span className="flex flex-col gap-2 w-full">
						{" "}
						<TextField
							className="w-full"
							id=""
							name="location"
							label="Location"
							variant="filled"
							value={props.data.values.location}
							onChange={props.data.handleChange}
							onBlur={props.data.handleBlur}
							error={
								props.data.touched.location && props.data.errors.location
									? true
									: false
							}
							disabled={props.disableFields}
							autoComplete="off"
						/>
						{props.data.touched.location && props.data.errors.location ? (
							<p className="text-red-500 text-sm">
								{props.data.errors.location}
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
							onChange={props.data.handleChange}
							onBlur={props.data.handleBlur}
							checked={
								props.data.values.indoorOrOutdoor.includes("indoor")
									? true
									: false
							}
							disabled={props.disableFields}
						/>
						<FormControlLabel
							control={<Checkbox />}
							label="Outdoor"
							value="outdoor"
							name="indoorOrOutdoor"
							onChange={props.data.handleChange}
							onBlur={props.data.handleBlur}
							checked={
								props.data.values.indoorOrOutdoor.includes("outdoor")
									? true
									: false
							}
							disabled={props.disableFields}
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
					value={props.data.values.ppeRequired}
					onChange={props.data.handleChange}
					onBlur={props.data.handleBlur}
					disabled={props.disableFields}
					autoComplete="off"
				/>
				<TextField
					className="w-full"
					id=""
					name="trainingRequired"
					label="Training Required"
					variant="filled"
					value={props.data.values.trainingRequired}
					onChange={props.data.handleChange}
					onBlur={props.data.handleBlur}
					disabled={props.disableFields}
					autoComplete="off"
				/>
				<TextField
					className="w-full"
					id=""
					name="equipmentUsed"
					label="Equipment used"
					variant="filled"
					value={props.data.values.equipmentUsed}
					onChange={props.data.handleChange}
					onBlur={props.data.handleBlur}
					disabled={props.disableFields}
					autoComplete="off"
				/>
				<TextField
					className="w-full"
					id=""
					name="chemicalsUsed"
					label="Chemicals used"
					variant="filled"
					value={props.data.values.chemicalsUsed}
					onChange={props.data.handleChange}
					onBlur={props.data.handleBlur}
					disabled={props.disableFields}
					autoComplete="off"
				/>
			</div>
			<TextField
				multiline
				rows={3}
				id="filled-multiline-flexible"
				name="additionalComments"
				label="Additional comments"
				variant="filled"
				value={props.data.values.additionalComments}
				onChange={props.data.handleChange}
				onBlur={props.data.handleBlur}
				disabled={props.disableFields}
				autoComplete="off"
			/>
		</div>
	);
}

export default GeneralInformationsForm;
