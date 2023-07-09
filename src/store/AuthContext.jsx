import { createContext, useState } from "react";

export const userAuthContext = createContext(null);

export default function AuthContext({ children }) {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("my_wallet_user_logged")) || "");

    return (
        <userAuthContext.Provider value={{ userData, setUserData }}>
            {children}
        </userAuthContext.Provider>
    )
}