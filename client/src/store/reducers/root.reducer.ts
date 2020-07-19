/**
 * @description: Root reducer module. Here all slice reducers for app state are combined and exported.
 */

import { combineReducers } from 'redux';
import {user} from "./user.reducer";

export default combineReducers({
    user
})