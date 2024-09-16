import React from "react";
import { Avatar, Stack, Typography } from "@mui/material";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import img from "../assets/Logo.avif";

const Header = () => {
	return (
		<Stack
			direction={"row"}
			alignItems={"center"}
			width={"100%"}
			paddingY={"1rem"}
			justifyContent={"space-between"}
			height={"10%"}
			paddingX={{ xs: "1rem", sm: "2rem" }}
		>
			<Stack direction={"row"} alignItems={"center"}>
				<Avatar src={img} />
				<Typography height={"100%"} variant="h4" fontWeight={"bold"}>
					SolGuard
				</Typography>
			</Stack>

			<Stack
				direction={"row"}
				alignItems={"center"}
				spacing={2}
				height={"100%"}
			>
				<WalletMultiButton />
			</Stack>
		</Stack>
	);
};

export default Header;
