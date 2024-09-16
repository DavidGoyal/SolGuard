import React from "react";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import img from "../assets/x profile.jpg";

const Hero = () => {
	const navigate = useNavigate();
	const wallet = useWallet();

	return (
		<Stack
			minHeight={"90vh"}
			width={"100%"}
			paddingX={{ xs: "1rem", sm: "3rem" }}
			paddingY={"1rem"}
			direction={{ xs: "column", md: "row" }}
			gap={{ xs: "6rem", md: "0" }}
		>
			<Stack
				width={{ xs: "100%", md: "60%" }}
				borderRight={{ xs: "none", md: "2px solid gray" }}
				gap={"4rem"}
			>
				<Typography
					variant="h1"
					textAlign={"center"}
					width={{ xs: "90%", sm: "70%", md: "90%", lg: "70%" }}
					mx={"auto"}
				>
					Secure your tokens without paying gas fees.
				</Typography>

				<Typography
					variant="h6"
					textAlign={"center"}
					width={{ xs: "80%", sm: "75%" }}
					mx={"auto"}
				>
					Victim of sol drainer hack? Don't worry we got you. We will transfer
					your tokens by paying gas fees ourselves.
				</Typography>

				<Stack direction={"row"} alignItems={"center"} spacing={2} mx={"auto"}>
					<Button
						variant={"contained"}
						sx={{ bgcolor: "white" }}
						onClick={() => {
							if (!wallet.publicKey) {
								return toast.error("Wallet not connected!");
							}
							navigate("/form");
						}}
					>
						Get Started
					</Button>
				</Stack>
			</Stack>

			<Stack
				width={{ xs: "100%", md: "40%" }}
				justifyContent={"flex-end"}
				alignItems={"center"}
				gap={"8rem"}
			>
				<Stack gap={"4rem"}>
					<Stack>
						<Typography variant="h2" textAlign={"center"}>
							20%
						</Typography>
						<Typography variant="h6" textAlign={"center"}>
							Pay 20% of your tokens and get it transferred
						</Typography>
					</Stack>

					<Stack>
						<Typography variant="h2" textAlign={"center"}>
							0
						</Typography>
						<Typography variant="h6" textAlign={"center"}>
							Sol to pay
						</Typography>
					</Stack>
				</Stack>

				<Stack alignItems={"center"}>
					<Avatar src={img} />
					<Typography variant="h6" textAlign={"center"}>
						A truly game changing website
					</Typography>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default Hero;
