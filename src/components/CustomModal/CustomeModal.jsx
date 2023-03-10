import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
function CustomeModal({
	openModal,
	handleOpenCloseModal,
	title,
	description,
	actionButton,
	actionButtonFunction,
}) {
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		boxShadow: 24,
		p: 4,
	};
	return (
		<Modal
			open={openModal}
			onClose={handleOpenCloseModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box className="flex flex-col gap-12" sx={style}>
				<div>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
						sx={{
							fontWeight: "bold",
						}}
					>
						{title}
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						{description}
					</Typography>
				</div>
				<div className="flex items-center gap-3">
					<Button
						sx={{
							background: "#cb2828",
							padding: "10px",
							":hover": {
								background: "#ad3333",
							},
						}}
						variant="contained"
						onClick={() => {
							actionButtonFunction();
							handleOpenCloseModal();
						}}
					>
						{actionButton}
					</Button>
					<Button
						onClick={handleOpenCloseModal}
						sx={{ color: "#374151", padding: "10px" }}
						variant="text"
					>
						Cancel
					</Button>
				</div>
			</Box>
		</Modal>
	);
}

export default CustomeModal;
