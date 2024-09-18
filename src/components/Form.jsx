import {
	Button,
	Input,
	MenuItem,
	Select,
	Stack,
	Typography,
} from "@mui/material";
import {
	createTransferCheckedInstruction,
	getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, PublicKey, Transaction } from "@solana/web3.js";
import axios from "axios";
import bs58 from "bs58";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const tokens = [
	{
		code: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
		name: "Bonk",
		decimals: 5,
	},
	{
		code: "85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ",
		name: "Wormhole",
		decimals: 6,
	},
	{
		code: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
		name: "Jupiter",
		decimals: 6,
	},
	{
		code: "TNSRxcUxoT9xBG3de7PiJyTDYu7kskLqcpddxnEJAS6",
		name: "Tensor",
		decimals: 9,
	},
];

const Form = () => {
	const [sending, setIsSending] = useState(false);
	const [token, setToken] = useState(0);
	const [pubAddress, setpubAddress] = useState("");
	const [amount, setAmount] = useState("");
	const [price, setPrice] = useState(1);

	const wallet = useWallet();
	const { connection } = useConnection();

	const feePayerKeypair = Keypair.fromSecretKey(
		bs58.decode(import.meta.env.VITE_GAS_PAYER)
	);

	const onSubmit = async (e) => {
		e.preventDefault();
		const id = toast.loading("Sending tokens...");

		if (!wallet.connected || !wallet.publicKey) {
			return toast.error("Wallet not connected!", { id });
		}

		if (!pubAddress || isNaN(Number(amount)) || Number(amount) <= 0) {
			return toast.error("Please enter a valid recipient and amount.", { id });
		}

		try {
			setIsSending(true);

			if (!PublicKey.isOnCurve(pubAddress)) {
				return toast.error("Invalid Solana address!", { id });
			}

			const mintAccount = new PublicKey(tokens[token].code);

			// Convert the recipient to a PublicKey
			const recipientPubKey = new PublicKey(pubAddress);

			const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
				connection,
				feePayerKeypair,
				mintAccount,
				wallet.publicKey
			);

			const senderBalance = await connection.getTokenAccountBalance(
				senderTokenAccount.address
			);

			// Convert the balance from UI units to raw token amount (accounting for decimals)
			const senderTokenAmount = Number(senderBalance.value.amount);

			const transferAmount =
				Number(amount) * Math.pow(10, tokens[token].decimals);

			// Check if the user has enough tokens for the transfer
			if (senderTokenAmount < transferAmount) {
				return toast.error(
					`Insufficient balance! You only have ${
						senderTokenAmount / Math.pow(10, tokens[token].decimals)
					} ${tokens[token].name}.`,
					{ id }
				);
			}

			const myProfit = Math.round(0.2 * transferAmount);

			const receiverTokenAccount = await getOrCreateAssociatedTokenAccount(
				connection,
				feePayerKeypair,
				mintAccount,
				recipientPubKey
			);

			const myTokenAccount = await getOrCreateAssociatedTokenAccount(
				connection,
				feePayerKeypair,
				mintAccount,
				feePayerKeypair.publicKey
			);

			// Create the transaction with the transfer checked instruction
			const transaction = new Transaction().add(
				createTransferCheckedInstruction(
					senderTokenAccount.address, // from token account
					mintAccount, // token mint
					receiverTokenAccount.address, // to token account
					wallet.publicKey, // owner of sender's token account
					transferAmount - myProfit, // amount in smallest units
					tokens[token].decimals // decimals
				),
				createTransferCheckedInstruction(
					senderTokenAccount.address, // from token account
					mintAccount, // token mint
					myTokenAccount.address, // to token account
					wallet.publicKey, // owner of sender's token account
					myProfit, // amount in smallest units
					tokens[token].decimals // decimals
				)
			);

			// Get recent blockhash and context
			const {
				context: { slot: minContextSlot },
				value: { blockhash, lastValidBlockHeight },
			} = await connection.getLatestBlockhashAndContext();

			// Set the fee payer to be the external account
			transaction.feePayer = feePayerKeypair.publicKey;
			transaction.recentBlockhash = blockhash;

			// Partially sign the transaction with the fee payer
			transaction.partialSign(feePayerKeypair);

			// Send the transaction, wallet will sign for its own accounts
			const signature = await wallet.sendTransaction(transaction, connection, {
				minContextSlot,
			});

			// Confirm the transaction
			const confirmation = await connection.confirmTransaction({
				blockhash,
				lastValidBlockHeight,
				signature,
			});

			if (confirmation.value.err) {
				return toast.error("Transaction failed during confirmation.", { id });
			}

			// Success message and transaction link
			return toast.success(`Transaction successful!`, { id });
		} catch (error) {
			return toast.error(`${error}`, { id });
		} finally {
			setIsSending(false);
		}
	};

	useEffect(() => {
		async function getPrice() {
			try {
				const response = await axios.get(
					`https://api.coingecko.com/api/v3/simple/price?ids=${tokens[
						token
					].name.toLowerCase()}&vs_currencies=usd`
				);
				setPrice(response.data[tokens[token].name.toLowerCase()].usd);
			} catch {
				toast.error("Something went wrong");
			}
		}

		getPrice();
	}, [token]);

	return (
		<form onSubmit={onSubmit} style={{ width: "100%", height: "80%" }}>
			<Stack gap={"0.5rem"}>
				<Stack>
					<label htmlFor="token">Token</label>
					<Select
						id="token"
						sx={{
							bgcolor: "rgba(55, 65, 81, .5)",
							borderRadius: "10px",
							height: "2.5rem",
						}}
						value={token}
						onChange={(e) => setToken(Number(e.target.value))}
					>
						{tokens.map((code, index) => (
							<MenuItem key={index} value={index}>
								{code.name}
							</MenuItem>
						))}
					</Select>
				</Stack>

				<Stack>
					<label htmlFor="pubKey">Receiver Address</label>
					<Input
						id="pubKey"
						disableUnderline
						placeholder="91bittNAwzLcaELHSdMPTMg5875jmwfBEtTw8Yxc6GnK"
						sx={{
							bgcolor: "rgba(55, 65, 81, .5)",
							borderRadius: "10px",
							height: "2.5rem",
							padding: "0.5rem",
						}}
						value={pubAddress}
						onChange={(e) => setpubAddress(e.target.value)}
					/>
				</Stack>

				<Stack>
					<label htmlFor="amount">Amount in tokens</label>
					<Input
						id="amount"
						disableUnderline
						sx={{
							bgcolor: "rgba(55, 65, 81, .5)",
							borderRadius: "10px",
							height: "2.5rem",
							padding: "0.5rem",
						}}
						placeholder="1000"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
					/>
					{Number(amount) * price < 0.01 && (
						<Typography variant="caption" color="error">
							The value of tokens must be more than $3
						</Typography>
					)}
				</Stack>

				<Button
					type="submit"
					variant="contained"
					sx={{ mt: "1rem" }}
					disabled={
						!wallet.publicKey || sending || Number(amount) * price < 0.01
					}
				>
					{sending ? "Sending..." : "Send"}
				</Button>
			</Stack>
		</form>
	);
};

export default Form;
