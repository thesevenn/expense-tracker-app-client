import {
	createContext,
	PropsWithChildren,
	useState,
	SetStateAction,
	Dispatch,
} from "react";

interface AuthContextType {
	auth: boolean;
	setAuth: Dispatch<SetStateAction<boolean>>;
	user: string;
	setUser: Dispatch<SetStateAction<string>>;
	error: string;
	setError: Dispatch<SetStateAction<string>>;
	message: string;
	setMessage: Dispatch<SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextType>(
	{} as AuthContextType
);

export default function AuthContextProvider({children}: PropsWithChildren) {
	const [auth, setAuth] = useState<boolean>(false);
	const [user, setUser] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [message, setMessage] = useState<string>("");

	const values: AuthContextType = {
		auth,
		user,
		error,
		message,
		setAuth,
		setError,
		setUser,
		setMessage,
	};

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

/* 
auth, user, login logout,sign

*/
