import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
				textAlign: "center",
				bgcolor: "background.paper",
				padding: 2,
			}}
		>
			<Typography variant="h1" gutterBottom>
				404
			</Typography>
			<Typography variant="h6" paragraph>
				Oops! The page you're looking for doesn't exist.
			</Typography>
			<Button variant="contained" onClick={() => navigate("/")}>
				Go to Home
			</Button>
		</Box>
	);
};

export default NotFound;
