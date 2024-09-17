import React from "react";

import { Stack } from "@mui/material";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Home = () => {
	return (
		<Stack
			minHeight={"100vh"}
			width={"100vw"}
			maxWidth={"100%"}
			sx={{ overflowX: "hidden" }}
		>
			<Header />
			<Hero />
			<Footer />
		</Stack>
	);
};

export default Home;
