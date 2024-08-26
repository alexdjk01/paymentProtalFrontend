import React, {createContext, useState, useContext, useEffect} from "react";

const authentificationContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser) {
            setUser(savedUser);
        }
    }, []);

    const login = (user) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <authentificationContext.Provider value={{ user, login, logout }}>
            {children}
        </authentificationContext.Provider>
    );

};

export const useAuth = () => useContext(authentificationContext);