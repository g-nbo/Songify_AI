import { createContext } from 'react';

const UserContext = createContext({
    loggedIn: false
});

export default UserContext;