import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export function AuthProvider({ children }) {

    const [user, setUser] = useState('')
    const [loading, setLoading] = useState(true)

    function encryptPassword(password) {
        return password + "eeee"
    }

    function login(userName, password) {
        const encryptedPassword = encryptPassword(password)
        const userID = "qwertyuiop"
        if (userName === import.meta.env.VITE_USER_NAME) {
            if (encryptedPassword === import.meta.env.VITE_PASSWORD) {
                localStorage.setItem('USER', userID)
                setUser(userID)
                return userID
            }
        }
        return ''
    }

    function logout() {
        localStorage.removeItem('USER')
        setUser('')
    }

    useEffect(() => {
        setUser(localStorage.getItem('USER'))
        setLoading(false)
    }, [])

    const value = {
        user,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}