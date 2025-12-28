import React, { createContext, useContext, useState } from "react";

interface UserContextType {
	userName: string;
	setUserName: (name: string) => void;
	transactionData: {
		qrCode: string;
		transactionId: string;
	};
	setTransactionData: React.Dispatch<
		React.SetStateAction<{
			qrCode: string;
			transactionId: string;
		}>
	>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	// Initialize userName from localStorage so it persists across sessions
	const [userName, setUserNameState] = useState(() => {
		try {
			return localStorage.getItem("userName") || "";
		} catch (e) {
			return "";
		}
	});

	const [transactionData, setTransactionData] = useState(
		localStorage.getItem("transactionData")
			? JSON.parse(localStorage.getItem("transactionData")!)
			: {
					qrCode: "",
					transactionId: "",
			  },
	);

	// Wrapper that persists name to localStorage and updates state
	const setUserName = (name: string) => {
		try {
			localStorage.setItem("userName", name);
		} catch (e) {
			// ignore localStorage errors (e.g., quota or privacy mode)
		}
		setUserNameState(name);
	};

	return (
		<UserContext.Provider
			value={{
				userName,
				setUserName,
				transactionData,
				setTransactionData: (data) => {
					try {
						localStorage.setItem("transactionData", JSON.stringify(data));
					} catch (e) {
						// ignore localStorage errors
					}
					setTransactionData(data);
				},
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};
