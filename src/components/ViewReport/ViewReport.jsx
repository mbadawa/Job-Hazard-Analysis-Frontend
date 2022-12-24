import React from "react";
import { useState } from "react";
function ViewReport(props) {
	const [closeModal, setCloseModal] = useState(true);
	const handleCloseModal = () => {
		setCloseModal(!closeModal);
	};
	return (
		<div>
			{closeModal && (
				<div>
					{" "}
					<button onClick={handleCloseModal}>Close {props.id} asd</button>
				</div>
			)}
		</div>
	);
}

export default ViewReport;
