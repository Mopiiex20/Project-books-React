import React, { Component } from 'react';
import { RootState } from '../../redux/rootReduser';
import { connect } from 'react-redux';
import "./profile.css"

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Grid, Avatar, TextField, Paper } from '@material-ui/core';
import { changeAvatar, changeName } from '../../redux/login/actions';

interface IProfileProps {
    user: {
        _id: number,
        firstName: string,
        age: number;
        email: string;
        avatar: string
    };
    isLoggedIn: boolean;
    token: string;
    changeAvatar: Function,
    changeName: Function,
    avatar: string
}

interface IProfileState {
    trigger: boolean;
    firstName: string;
    currentUser: any
}

class Profile extends Component<IProfileProps, IProfileState> {

    state: IProfileState = {
        trigger: false,
        firstName: "",
        currentUser: []
    }

    user = this.props.user;
    userId = this.props.user._id;
    token: string = this.props.token;



    saveNewName = (user: any) => {
        const { changeName } = this.props;
        user.firstName = this.state.firstName;
        changeName(user);

        this.setState({
            trigger: !this.state.trigger
        })

        // req(`users/:${user._id}`, "PUT", user);
    }
    toBase64 = (file: any) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    async UploadAvatar(user: any) {
        let path: any = document.querySelector("#text-button-file") as HTMLElement;

        if (path.value !== "") {

            const { changeAvatar } = this.props;
            await this.toBase64(path.files[0]).then((json) => user.avatar = json);
            changeAvatar(user);
            path.value = "";

        } else { alert("Please pick some picture to upload") }
    }

    render() {
        const handleChange = (event: any) => {
            this.setState({ [event.target.name]: event.target.value } as any);
        }
        return (
            <Paper >
                {this.props.isLoggedIn ? (
                    <Grid
                        direction="column"
                        container xl={12}
                        alignItems="center"
                    >
                        <div className="container">
                            <Avatar alt="" src={this.props.user.avatar} ></Avatar>
                        </div>
                        <input
                            accept="image/*"
                            id="text-button-file"
                            multiple
                            type="file"
                            onChange={(e) => { }}
                        />
                        <Button variant="contained" size="small" color="primary" onClick={() => { this.UploadAvatar(this.props.user) }} component="span" >
                            Upload new Avatar
                                </Button>
                        {this.state.trigger ? (
                            <Typography
                            >
                                <TextField
                                    name="firstName"
                                    onChange={(e) => handleChange(e)}
                                    value={this.state.firstName}
                                />
                            </Typography>
                        ) : (
                                <Typography>
                                    User Name : {this.props.user.firstName}
                                </Typography>
                            )}
                        {this.state.trigger ? (
                            <Button variant="contained" size="small" color="primary" onClick={() => { this.saveNewName(this.props.user) }} >Save Changes</Button>
                        ) : (
                                <Button variant="contained" size="small" color="primary" onClick={() => this.setState({
                                    trigger: !this.state.trigger,
                                    firstName: this.props.user.firstName
                                })} >Change Name</Button>
                            )}
                        <Typography>
                            E-mail adress :  {this.props.user.email}
                        </Typography>
                        <Typography>
                            User's Age : {this.props.user.age}
                        </Typography>
                    </Grid>
                )
                    : (
                        <div>
                            Please Log In
                        </div>
                    )}
            </Paper>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    user: state.login.user,
    isLoggedIn: state.login.isLoggedIn,
    token: state.login.token,
    avatar: state.login.avatar
});

export default connect(mapStateToProps, { changeAvatar, changeName })(Profile)