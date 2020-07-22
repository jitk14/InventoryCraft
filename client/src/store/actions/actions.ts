/**
 * @description: Module containing all the actions of the app
 *
 */
import axios from 'axios';

export const LOGGED_IN: string =  'LOGGED_IN';
export const LOG_OUT: string = 'LOGGED_OUT';

export const loginActionCreator = (payload:any) => {
    return (dispatch:any) => {
        return axios.post('/update', payload)
            .then((_data) => {
                dispatch({
                    type: LOGGED_IN,
                    payload:  {
                        name: "Harsh Kumar"
                    }
                });
            })
            .catch((err) =>{
                alert("Errror ocurred");
            });
    }
}