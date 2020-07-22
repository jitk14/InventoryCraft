/**
 * @description: isLoggedIn state slice reducer
 */
import { LOGGED_IN } from '../actions/actions';

type UserState = {
    isLoggedIn: boolean;
    firstName: string;
    lastName: string;
}

const initialUserState = null;

export const user = (userState: UserState | null = initialUserState, action: any = {}): UserState | null => {
    const { type, payload } = action;

    switch (type) {
        case LOGGED_IN: {
            return {...payload};
        }
        default: return userState;
    }
}