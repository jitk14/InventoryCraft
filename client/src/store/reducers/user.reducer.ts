/**
 * @description: isLoggedIn state slice reducer
 */
import { SET_USER } from '../actions/actions';

type UserState = {
    isLoggedIn: boolean;
    firstName: string;
    lastName: string;
}

const initialUserState = null;

export const user = (userState: UserState | null = initialUserState, action: any = {}): UserState | null => {
    const { actionType, payload } = action;

    switch (actionType) {
        case SET_USER: {
            return {...payload};
        }
        default: return userState;
    }
}