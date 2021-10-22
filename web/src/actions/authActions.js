
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const login = (email, uid, photoURL, name) => (
    { type: LOGIN, payload: {email, uid, photoURL, name} })

export const logout = () => ({
    type: LOGOUT
});



