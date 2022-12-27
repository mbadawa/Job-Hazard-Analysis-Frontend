import React from "react";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";

function AnalysisForm(props) {
	// Handles analysis section dynamic inputs etc
	const handleAddAnalysis = () => {
		props.setAnalysisArray([
			...props.analysisArray,
			{ activity: "", potentialHazards: "", proceduresEquipmentTraining: "" },
		]);
	};
	const handleAnalysisChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...props.analysisArray];
		list[index][name] = value;
		props.setAnalysisArray(list);
	};
	const handleRemoveAnalysis = (index) => {
		const list = [...props.analysisArray];
		list.splice(index, 1);
		props.setAnalysisArray(list);
	};
	return (
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
					{props.analysisArray.map((myAnalysis, index) => (
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
									disabled={props.disableFields}
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
									disabled={props.disableFields}
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
									disabled={props.disableFields}
								/>
								{props.analysisArray.length > 1 &&
									props.disableFields === false && (
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
								disabled={props.disableFields}
							>
								Add Analysis
							</Button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default AnalysisForm;
