import React, { useMemo } from "react";
import {
	ConnectionProvider,
	WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./components/Loader";

const Home = lazy(() => import("./pages/Home"));
const FormPage = lazy(() => import("./pages/FormPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
	// You can also provide a custom RPC endpoint.
	const endpoint = useMemo(
		() =>
			"https://bulk-solanam-29fa.mainnet.rpcpool.com/eed85661-9491-43ba-a127-97d11c45a2b7",
		[]
	);
	return (
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider wallets={[]} autoConnect>
				<WalletModalProvider>
					<Router>
						<Suspense fallback={<Loader />}>
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/form" element={<FormPage />} />
								<Route path="*" element={<NotFound />} />
							</Routes>
							<Toaster position="bottom-center" />
						</Suspense>
					</Router>
				</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	);
};

export default App;
