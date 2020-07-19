/**
 *
 */
import React from "react";
import { Card } from '@material-ui/core';
import loginStyles from './login.style.scss';
interface ILoginProps {

}

export class Login extends React.Component<ILoginProps, any> {
    constructor(props:ILoginProps) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (<div className={"inv-login-wrapper"}>
           <div className={"inv-login-box"}>
               <Card>

               </Card>
           </div>
        </div>);
    }
}