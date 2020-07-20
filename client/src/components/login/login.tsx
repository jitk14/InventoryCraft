/**
 * @description: Login Component for the application
 * This must be shown on the basis of login status state determined external to it.
 *
 */
import React, { createRef } from "react";
import styles from './login-form/login.module.scss';
import { isValidEmail } from "../../utils/validators/validators";
import {LoginContent, LoginForm, LoginFormErrors} from "./login-form/login-form";

interface ILoginProps {

}

interface IState {
    loading: boolean;
    userEmail?: string;
    password?: string;
    errors: LoginFormErrors
}

enum InputLengths {
    PWD_MIN = 10,
    PWD_MAX = 20,
    EMAIL_MAX = 200
}

export class Login extends React.Component<ILoginProps, IState> {
    private passwordRef = createRef<HTMLInputElement>();
    private emailInputRef = createRef<HTMLInputElement>();

    constructor(props:ILoginProps) {
        super(props);

        this.state = {
            loading: false,
            errors: {
                email: {
                    invalid: false,
                    errorText: '',
                },
                password: {
                    invalid: false,
                    errorText: '',
                },
                login: {
                    invalid: false,
                    errorText: '',
                }
            }
        }
    }

    componentDidMount() {

    }

    validateEmail = () => {
        const email = (this.state.userEmail || '').trim();
        const valid = isValidEmail(email);

        let errorText = '';

        if (!valid) {
            const requiredError = email.length === 0;
            errorText = requiredError ? 'Email field is required' : 'Enter a valid email'
        }

        if (this.state.errors.email.invalid !== !valid || this.state.errors.email.errorText !== errorText) {
            this.setState((state) => {
                return {
                    errors: {
                        ...state.errors
                        , ...{
                            email: {
                                invalid: !valid,
                                errorText,
                            }
                        }
                    }
                }
            });
        }

        return valid;
    }

    validatePassword = (): boolean => {
        const password = (this.state.password || '').trim();
        const valid:boolean = password.length >= InputLengths.PWD_MIN && password.length <= InputLengths.PWD_MAX;

        let errorText = '';

        if (!valid) {
            const requiredError = password.length === 0;
            errorText = requiredError ? 'Password field is required' : 'Allowed length 10-20'
        }

        if (this.state.errors.password.invalid !== !valid || this.state.errors.password.errorText !== errorText) {
            this.setState((state)=> {
                return {
                    errors: {...state.errors, ...{
                            password: {
                                invalid: !valid,
                                errorText,
                            }
                        }}
                }
            })
        }

        return valid;
    }

    validateForm() {
        const validators = [
            this.validateEmail,
            this.validatePassword
        ];

        let valid = true;

        for (const validator of validators) {
            if (!validator()) {
                valid = false;
            }
        }

        return valid;
    }

    emailChangeListener = (email: string) => {
        this.setState({
            userEmail: email
        })
    }

    passwordChangeListener = (password: string) => {
        this.setState({
            password
        })
    }

    submitForm = (ev: React.FormEvent<HTMLElement>) => {
        ev.preventDefault();

        if (!this.validateForm()) {
            return;
        }

        this.setState({
            loading: true
        })

        const payload = {
            email: this.state.userEmail,
            password: this.state.password,
        };

        console.log("Submit triggered");
    }

    getTitle() {
        return 'Account Login';
    }

    /**
     * Method to get the form labels and contents
     */
    getContent():LoginContent {
        return {
            emailLabel: 'User email',
            passwordLabel: 'Password',
            invalidInput: 'Invalid user email or password',
            submitLabel: 'Log in'
        }
    }

    render() {
        return (<div className={`${styles.loginWrapper} flex-container`}>
           <LoginForm onEmailChange={this.emailChangeListener} onPasswordChange={this.passwordChangeListener}
                      onEmailBlur={this.validateEmail} onPasswordBlur={this.validatePassword}
                      onSubmit={this.submitForm} title={this.getTitle()} loading = {this.state.loading}
                      content={this.getContent()} passwordInputRef={this.passwordRef} emailInputRef={this.emailInputRef}
                      errors={this.state.errors}
                      lengths={InputLengths}
           />
        </div>);
    }
}