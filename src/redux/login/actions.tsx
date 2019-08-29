import { LoginRequest, LoginActions } from './types'


export default function doLogin(data: LoginRequest) {
    return {
        type: `@@LOGIN/${LoginActions.DO_LOGIN}`,
        data
    }
};
export function changeAvatar(user: any) {
    return {
        type: `@@LOGIN/${LoginActions.CHANGE_AVATAR}`,
        user
    }
};
export function changeName(user: any) {
    return {
        type: `@@LOGIN/${LoginActions.CHANGE_NAME}`,
        user
    }
};

export function logOut() {
    return {
        type: `@@LOGIN/LOGOUT`,

    }
};




