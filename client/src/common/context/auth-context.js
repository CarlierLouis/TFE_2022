import { createContext } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    userId: null,
    token: null,
    teacher: false,
    admin: false,
    login: () => {},
    logout: () => {}
});