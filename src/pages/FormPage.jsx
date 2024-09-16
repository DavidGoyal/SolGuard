import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Button, Stack, Typography } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Navigate, useNavigate } from "react-router-dom";
import Form from "../components/Form";

const FormPage = () => {
	const navigate = useNavigate();
	const wallet = useWallet();

	if (!wallet.publicKey) {
		return <Navigate to="/" />;
	}

	return (
		<Stack
			minHeight={"100vh"}
			width={"100vw"}
			alignItems={"center"}
			justifyContent={"center"}
			padding={"1rem"}
			gap={"1rem"}
			position={"relative"}
		>
			<Stack sx={{ position: "absolute", top: "1rem", right: "1rem" }}>
				<WalletMultiButton />
			</Stack>

			<Stack minWidth={"20vw"} minHeight={"58vh"} gap={"1rem"}>
				<Button
					variant="contained"
					onClick={() => navigate(-1)}
					sx={{ width: "fit-content" }}
				>
					<KeyboardBackspaceIcon />
				</Button>

				<Stack
					minWidth={"20vw"}
					minHeight={"58vh"}
					bgcolor={"hsla(210,20%,98%,0.05)"}
					padding={"2rem"}
					borderRadius={"1rem"}
					justifyContent={"space-between"}
				>
					<Typography variant="h3" textAlign={"center"}>
						Send Tokens
					</Typography>

					<Form />
				</Stack>
			</Stack>
		</Stack>
	);
};

export default FormPage;
