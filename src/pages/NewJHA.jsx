import React from "react";
import Navbar from "../components/Navbar/Navbar";
import CreateJHA from "../components/CreateJHA/CreateJHA";
import Title from "../components/Title/Title";
function NewTask() {
	return (
		<div>
			<Navbar />
			<Title title="New Job Hazard Analysis" />
			<CreateJHA />
		</div>
	);
}

export default NewTask;
