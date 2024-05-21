import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider(props) {
    const [auth, setAuth] = useState({ user: null, token: '' });

    function fetchlocalStorageData() {
        const data = localStorage.getItem('user');
        if (data) {
            const parsedata = JSON.parse(data);
            setAuth({ ...auth, user: parsedata.user, token: parsedata.token });
        }
    }

    useEffect(() => {
        fetchlocalStorageData();
    }, [])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const dt = useContext(AuthContext);
    return dt;
}

export { AuthProvider, useAuth };