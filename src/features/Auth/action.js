import { USER_LOGIN, USER_LOGOUT } from './constant';

export function userLogin(user, token){
    return {
        type: USER_LOGIN,
        user,
        token
    }
}

export function userLogout(){
    return { type: USER_LOGOUT }
}