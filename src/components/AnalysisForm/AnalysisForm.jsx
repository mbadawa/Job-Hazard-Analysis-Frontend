import React from "react";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";

function AnalysisForm({ analysisArray, setAnalysisArray, disableFields }) {
	// Handles analysis section dynamic inputs etc
	const handleAddAnalysis = () => {
		setAnalysisArray([
			...analysisArray,
			{ activity: "", potentialHazards: "", proceduresEquipmentTraining: "" },
		]);
	};
	const handleAnalysisChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...analysisArray];
		list[index][name] = value;
		setAnalysisArray(list);
	};
	const handleRemoveAnalysis = (index) => {
		const list = [...analysisArray];
		list.splice(index, 1);
		setAnalysisArray(list);
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
									value={myAnalysis.activity}
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
									value={myAnalysis.potentialHazards}
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
									value={myAnalysis.proceduresEquipmentTraining}
									disabled={disableFields}
								/>
								{analysisArray.length > 1 && disableFields === false && (
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
