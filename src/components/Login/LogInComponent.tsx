import * as React from "react";
import { LoginRequest } from "../../redux/login/types";
import ErrorComponent from "../Common/errorComponent"
import './login.css';
import Button from "../Material/button"
import { Redirect } from "react-router-dom";
import { makeStyles, LinearProgress } from "@material-ui/core";

export interface LoginProps {
    doLogin: (data: LoginRequest) => object;
    isLoggedIn: boolean,
    user: any,
    history: any,
    error: string,
    errorInfo: string,
    isLoggedOut: boolean,
    loading: boolean
}
interface LoginState {
    isLoggedIn: boolean;
    user: any;
    errorText: string;
    isAdmin: boolean;
    loading: boolean;
    email: string;
    password: string;
}

export class LoginComponent extends React.Component<LoginProps, LoginState> {
    state: LoginState = {
        isLoggedIn: this.props.isLoggedIn,
        email: "",
        password: "",
        user: '',
        errorText: "",
        isAdmin: false,
        loading: false
    };
    handleChange = (event: any) => {
        this.setState({ [event.target.name]: event.target.value } as any);
    }
    logIn = () => {
        localStorage.clear();
        const { doLogin } = this.props;
        doLogin({ email: this.state.email, password: this.state.password });
    }

    redirect = (path: string) => {
        this.props.history.push("/" + path)
    }

    render() {
        if (this.props.isLoggedIn) {
            return <Redirect to="/" />;
        }
        return (
            <div className="head1">
                {this.props.loading ? (
                    <div>
                        <LinearIndeterminate />
                    </div>
                ) : (
                        <div>
                            <div>
                                <ErrorComponent error={this.props.error} errorType={this.props.errorInfo} message="Incorrect E-mail. or Password"/>
                            </div>
                            <div>
                                {this.props.isLoggedIn ? (
                                    <div>
                                    </div>) : (
                                        <div>
                                            <span>
                                                <p>E-mail :</p>
                                                <p>
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        value={this.state.email}
                                                        onChange={this.handleChange}
                                                    />
                                                </p>
                                            </span>
                                            <span>

                                                <p>Password :</p>
                                                <p>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        value={this.state.password}
                                                        onChange={this.handleChange}
                                                    />
                                                </p>
                                            </span>
                                            <span>
                                                <Button text="Log In" click={() => this.logIn()} />
                                            </span>
                                            <span>
                                                <label onClick={() => this.redirect("register")}>Register</label>
                                            </span>
                                        </div>)}
                            </div>
                        </div>
                    )}
            </div>
        )
    }
}
const useStyles1 = makeStyles({
    root: {
        flexGrow: 1,
    },
});
export function LinearIndeterminate() {
    const classes = useStyles1();

    return (
        <div className={classes.root}>
            <LinearProgress />
        </div>
    );
}
