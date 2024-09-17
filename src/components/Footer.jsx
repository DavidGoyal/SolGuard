import { Stack, Typography, Link } from "@mui/material";

const Footer = () => {
	return (
		<Stack
			height={"6rem"}
			width={"100%"}
			bgcolor={"black"}
			justifyContent={"center"}
			alignItems={"center"}
		>
			<Stack
				width={"80%"}
				direction={{ xs: "column", sm: "row" }}
				justifyContent={"space-between"}
				gap={"1rem"}
				alignItems={"center"}
			>
				<Typography color="white" textAlign={{ xs: "center", sm: "initial" }}>
					&copy; 2024 SolGuard, Inc. All Rights Reserved.
				</Typography>

				<Typography
					color="white"
					component={Link}
					href="https://x.com/p0tatooo1"
					target="_blank"
					sx={{ textDecoration: "none", cursor: "pointer" }}
				>
					Contact Us
				</Typography>
			</Stack>
		</Stack>
	);
};

export default Footer;
