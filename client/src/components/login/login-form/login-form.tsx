import styles from "./login.module.scss";
import {Button, Card, TextField} from "@material-ui/core";
import React, {ReactComponentElement} from "react";
import {FUNCTION_TYPE} from "../../../constants/app-constants";
import {Loader} from "../../helper/loader/loader";

export type LoginContent = {
    emailLabel: string;
    emailError: string;
    passwordLabel: string;
    passwordError: string;
    invalidInput: string;
    submitLabel: string
}

type ErrorDetails = {
    invalid: boolean;
    errorText: string;
}

export type LoginFormErrors = {
    email: ErrorDetails;
    password: ErrorDetails;
    login: ErrorDetails;
}

interface IInputLengths {
    PWD_MAX: number;
    PWD_MIN: number;
    EMAIL_MAX: number;
}

interface IProps {
    onEmailBlur?: (email: string) => void;
    onEmailChange?: (email: string) => void;
    onPasswordChange?: (password: string) => void;
    onPasswordBlur?: (password: string) => void;
    onSubmit: (ev: React.FormEvent<HTMLElement>) => void;
    emailInputRef?: React.Ref<any>;
    passwordInputRef?: React.Ref<any>;
    title? : string | ReactComponentElement<any, any>;
    loading: boolean;
    content: LoginContent;
    errors: LoginFormErrors;
    lengths: IInputLengths
}

export const LoginForm = (props: IProps) => {
    const onEmailBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
        if (typeof props.onEmailBlur !== FUNCTION_TYPE) {
            return;
        }

        const target: (EventTarget & HTMLInputElement) = ev.target;
        const email: string = (target != null && target.value) || '';

        props.onEmailBlur && props.onEmailBlur(email);
    }

    const onEmailChange = (ev: React.FocusEvent<HTMLInputElement>) => {
        if (typeof props.onEmailChange !== FUNCTION_TYPE) {
            return;
        }

        const target: (EventTarget & HTMLInputElement) = ev.target;
        const email: string = (target != null && target.value) || '';
        props.onEmailChange && props.onEmailChange(email);
    }

    const onPasswordChange = (ev: React.FocusEvent<HTMLInputElement>) => {
        if (typeof props.onPasswordChange !== FUNCTION_TYPE) {
            return;
        }

        const target: (EventTarget & HTMLInputElement) = ev.target;
        const email: string = (target != null && target.value) || '';
        props.onPasswordChange && props.onPasswordChange(email);
    }

    const onPasswordBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
        if (typeof props.onPasswordBlur !== FUNCTION_TYPE) {
            return;
        }

        const target: (EventTarget & HTMLInputElement) = ev.target;
        const email: string = (target != null && target.value) || '';
        props.onPasswordBlur && props.onPasswordBlur(email);
    }

    const getLoginErrorText = () => {
        if (!props.errors.login || !props.errors.login.invalid) {
            return null;
        }

        return (
            <li className={styles.loginError}>
                <span>{props.errors.login.errorText}</span>
            </li>
        );
    }

    return (<div className={`${styles.loginWrapper} flex-container login-form-component`}>
        <div className={`${styles.loginBox} flex-child`}>
            { props.loading ? <Loader occupyFull={true}/> : null }
            <Card>
                <form onSubmit={props.onSubmit}>
                    <h2 className={`${styles.title} login-title`}>{props.title}</h2>
                    <ul className={`${styles.formContainer} fields-container`}>
                        <li className={`${styles.formField} login-form-fields`}>
                            <TextField ref={props.emailInputRef} name={'inv-usr-email'} label={props.content.emailLabel}
                                   fullWidth={true} onChange={onEmailChange} onBlur={onEmailBlur}
                                   error={props.errors && props.errors.email && props.errors.email.invalid}
                                   helperText = {(props.errors && props.errors.email && props.errors.email.errorText) || ''}
                                   inputProps={{ maxLength: props.lengths.PWD_MAX}}
                            />
                        </li>
                        <li className={`${styles.formField} login-form-fields`}>
                            <TextField ref={props.passwordInputRef} name={'inv-usr-password'} type={'password'} fullWidth={true}
                                       label={props.content.passwordLabel}
                                       onChange={onPasswordChange} onBlur={onPasswordBlur}
                                       error={props.errors && props.errors.password && props.errors.password.invalid}
                                       helperText = {(props.errors && props.errors.password && props.errors.password.errorText) || ''}
                                       inputProps={{ maxLength: props.lengths.PWD_MAX, minLength: props.lengths.PWD_MIN}}
                            />
                        </li>
                        {getLoginErrorText()}
                        <li className={`${styles.submitButton} login-form-fields`}>
                            <Button color="primary" type={'submit'} variant="contained">
                                {props.content.submitLabel}
                            </Button>
                        </li>
                    </ul>
                </form>
            </Card>
        </div>
    </div>);
}