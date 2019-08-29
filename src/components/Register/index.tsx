import * as React from 'react';
import './register.css';
import req from '../../services/Request'
import ErrorComponent from '../Common/errorComponent';

interface IRegisterState {
    firstName: string,
    password: string,
    passwordCheck: string,
    email: string,
    age: number,
    message: string
}
interface IRegisterProps {
    firstName: string,
    password: string,
    passwordCheck: string,
    email: string,
    age: number
}

export default class Register extends React.Component<IRegisterProps, IRegisterState> {
    constructor(props: any) {
        super(props);
        this.state = {
            firstName: "",
            password: "",
            email: "",
            age: 18,
            passwordCheck: "",
            message: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }
    validateEmail = (inputText: any) => {
        let mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (inputText.match(mailformat)) {
            return true;
        }
        else {
            return false;
        }
    }
    handleChange(event: any) {
        let element: any = document.getElementById('mess1');
        this.setState({ [event.target.name]: event.target.value } as any);
        setTimeout(() => {
            if (this.state.passwordCheck !== "") {
                if (this.state.passwordCheck === this.state.password) {
                    element.setAttribute("style", "display:none");
                }
                if (this.state.passwordCheck !== this.state.password) {
                    element.setAttribute("style", "display:block");
                }
            }
        }, 100);
    }
    check = (event: any) => {
        event.preventDefault();
        let a = this.validateEmail(this.state.email);
        let fields_check: boolean = false;
        let arr: any = Object.values(this.state);
        arr.pop(1);
        fields_check = arr.includes("");
        if (!fields_check) {
            if (a) {
                let post: any = this.state;
                delete post.passwordCheck;
                req("register", 'POST', post).then(
                    user => this.setState({
                        message: user.message
                    })
                )
            } else alert("You have entered an invalid email address!")
        } else alert("All fields must be filled!")
    }

    render() {
        let error = "";
        let errorType = "";
        if (this.state.message !== "") {
            error = "error";
            errorType = "loginError"
            setTimeout(() => {
                this.setState({
                    message: ""
                })
            }, 2000);
        }
        return (
            <div className="head2">
                <ErrorComponent error={error} errorType={errorType} message={this.state.message} />
                <form onSubmit={this.check} className="auth">
                    <p>
                        <span>First Name:</span>
                        <input
                            name="firstName"
                            type="text"
                            value={this.state.firstName}
                            onChange={this.handleChange} />
                    </p>
                    <p>
                        <span>Password:</span>
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange} />
                    </p>
                    <p>
                        <span id="mess1" style={{ display: "none" }}>Passwords don'n match!</span>
                    </p>
                    <p>
                        <span>Confirm Password:</span>
                        <input type="password"
                            name="passwordCheck"
                            value={this.state.passwordCheck}
                            onChange={this.handleChange} />
                    </p>
                    <p>
                        <span>E-mail:</span>
                        <input
                            type="text"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange} />
                    </p>
                    <p>
                        <span>Age:</span>
                        <input
                            type="number"
                            name="age"
                            value={this.state.age}
                            onChange={this.handleChange} />
                    </p>
                    <p>
                        <input type="submit" value="Register" />
                    </p>
                </form>
            </div>

        )
    }

}