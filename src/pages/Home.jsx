import React from "react";

import { Stack } from "@mui/material";
import Header from "../components/Header";
import Hero from "../components/Hero";

const Home = () => {
	return (
		<Stack minHeight={"100vh"} width={"100vw"} sx={{ overflowX: "hidden" }}>
			<Header />
			<Hero />
		</Stack>
	);
};

export default Home;
