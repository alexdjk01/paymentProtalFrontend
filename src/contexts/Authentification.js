import React, {createContext, useState, useContext, useEffect} from "react";

const authentificationContext = createContext();

export const AuthProvider = ({children}) => {

    const [userAuth, setuserAuth] = useState(null);

    useEffect(() => {
        const saveduserAuth = JSON.parse(localStorage.getItem('userAuth'));
        if (saveduserAuth) {
            setuserAuth(saveduserAuth);
        }
    }, []);

    const login = (userAuth) => {
        setuserAuth(userAuth);
        localStorage.setItem('userAuth', JSON.stringify(userAuth));
    };

    const logout = () => {
        setuserAuth(null);
        localStorage.removeItem('userAuth');
    };

    return (
        <authentificationContext.Provider value={{ userAuth, login, logout }}>
            {children}
        </authentificationContext.Provider>
    );

};

export const useAuth = () => useContext(authentificationContext);