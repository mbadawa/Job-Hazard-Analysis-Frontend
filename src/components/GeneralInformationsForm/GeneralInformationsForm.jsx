import React from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function GeneralInformationsForm({ data, disableFields }) {
	return (
		<div className="flex flex-col gap-7">
			<div className="md:flex grid grid-rows-2 gap-3">
				<span className="flex flex-col gap-2 w-full">
					<TextField
						className="w-full"
						label="Full Name"
						name="fullName"
						variant="filled"
						placeholder="Please enter your name"
						value={data.values.fullName}
						onChange={data.handleChange}
						onBlur={data.handleBlur}
						error={data.touched.fullName && data.errors.fullName ? true : false}
						disabled={disableFields}
						autoComplete="off"
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
						disabled={disableFields}
						autoComplete="off"
					/>
					{data.touched.superVisorName && data.errors.superVisorName ? (
						<p className="text-red-500 text-sm">{data.errors.superVisorName}</p>
					) : (
						<p className="text-gray-400 text-sm">Required</p>
					)}
				</span>
			</div>
			<div className="md:flex grid grid-rows-2 gap-3">
				<span className="flex flex-col gap-2 w-full">
					<TextField
						className="w-full"
						name="companyName"
						label="Company Name"
						variant="filled"
						value={data.values.companyName}
						onChange={data.handleChange}
						onBlur={data.handleBlur}
						error={
							data.touched.companyName && data.errors.companyName ? true : false
						}
						disabled={disableFields}
						autoComplete="off"
					/>
					{data.touched.companyName && data.errors.companyName ? (
						<p className="text-red-500 text-sm">{data.errors.companyName}</p>
					) : (
						<p className="text-gray-400 text-sm">Required</p>
					)}
				</span>
				<span className="flex flex-col gap-2 w-full">
					<TextField
						className="w-full"
						name="projectName"
						label="Project Name"
						variant="filled"
						value={data.values.projectName}
						onChange={data.handleChange}
						onBlur={data.handleBlur}
						error={
							data.touched.projectName && data.errors.projectName ? true : false
						}
						disabled={disableFields}
						autoComplete="off"
					/>
					{data.touched.projectName && data.errors.projectName ? (
						<p className="text-red-500 text-sm">{data.errors.projectName}</p>
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
							value={data.values.projectDate}
							onChange={(date) =>
								data.handleChange({
									target: { value: date, name: "projectDate" },
								})
							}
							disabled={disableFields}
							onBlur={data.handleBlur}
							autoComplete="off"
							renderInput={(params) => <TextField {...params} />}
						/>
						{data.touched.projectDate && data.errors.projectDate ? (
							<p className="text-red-500 text-sm">Please enter a valid date</p>
						) : (
							<p className="text-gray-400 text-sm">Required</p>
						)}
					</span>
				</LocalizationProvider>
				<span className="flex flex-col gap-2 w-full">
					<TextField
						className="w-full"
						name="operation"
						label="Operation"
						variant="filled"
						value={data.values.operation}
						onChange={data.handleChange}
						onBlur={data.handleBlur}
						error={
							data.touched.operation && data.errors.operation ? true : false
						}
						disabled={disableFields}
						autoComplete="off"
					/>
					{data.touched.operation && data.errors.operation ? (
						<p className="text-red-500 text-sm">{data.errors.operation}</p>
					) : (
						<p className="text-gray-400 text-sm">Required</p>
					)}
				</span>
			</div>
			<div className="md:flex grid grid-rows-2 gap-3">
				<span className="flex flex-col gap-2 w-full">
					<TextField
						className="w-full"
						name="departmentOrUnit"
						label="Department/Unit"
						variant="filled"
						value={data.values.departmentOrUnit}
						onChange={data.handleChange}
						onBlur={data.handleBlur}
						error={
							data.touched.departmentOrUnit && data.errors.departmentOrUnit
								? true
								: false
						}
						disabled={disableFields}
						autoComplete="off"
					/>
					{data.touched.departmentOrUnit && data.errors.departmentOrUnit ? (
						<p className="text-red-500 text-sm">
							{data.errors.departmentOrUnit}
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
							name="location"
							label="Location"
							variant="filled"
							value={data.values.location}
							onChange={data.handleChange}
							onBlur={data.handleBlur}
							error={
								data.touched.location && data.errors.location ? true : false
							}
							disabled={disableFields}
							autoComplete="off"
						/>
						{data.touched.location && data.errors.location ? (
							<p className="text-red-500 text-sm">{data.errors.location}</p>
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
								data.values.indoorOrOutdoor.includes("indoor") ? true : false
							}
							disabled={disableFields}
						/>
						<FormControlLabel
							control={<Checkbox />}
							label="Outdoor"
							value="outdoor"
							name="indoorOrOutdoor"
							onChange={data.handleChange}
							onBlur={data.handleBlur}
							checked={
								data.values.indoorOrOutdoor.includes("outdoor") ? true : false
							}
							disabled={disableFields}
						/>
					</span>
				</div>
			</div>
			<div className="md:flex grid grid-rows-2 gap-3">
				<TextField
					className="w-full"
					name="ppeRequired"
					label="PPE Required"
					variant="filled"
					value={data.values.ppeRequired}
					onChange={data.handleChange}
					onBlur={data.handleBlur}
					disabled={disableFields}
					autoComplete="off"
				/>
				<TextField
					className="w-full"
					name="trainingRequired"
					label="Training Required"
					variant="filled"
					value={data.values.trainingRequired}
					onChange={data.handleChange}
					onBlur={data.handleBlur}
					disabled={disableFields}
					autoComplete="off"
				/>
				<TextField
					className="w-full"
					name="equipmentUsed"
					label="Equipment used"
					variant="filled"
					value={data.values.equipmentUsed}
					onChange={data.handleChange}
					onBlur={data.handleBlur}
					disabled={disableFields}
					autoComplete="off"
				/>
				<TextField
					className="w-full"
					name="chemicalsUsed"
					label="Chemicals used"
					variant="filled"
					value={data.values.chemicalsUsed}
					onChange={data.handleChange}
					onBlur={data.handleBlur}
					disabled={disableFields}
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
				value={data.values.additionalComments}
				onChange={data.handleChange}
				onBlur={data.handleBlur}
				disabled={disableFields}
				autoComplete="off"
			/>
		</div>
	);
}

export default GeneralInformationsForm;
