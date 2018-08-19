import React, { Component } from 'react';
import {connect} from 'react-redux';

import history from '../../../root/history';

import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Lock from '@material-ui/icons/Lock';
import PermIdentity from '@material-ui/icons/PermIdentity';
import CheckCircle from '@material-ui/icons/CheckCircle';

import {styles} from './styles';

import {login, register} from '../../../redux/actions/authActions';


class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogOpen: false,
            errorDialogOpen: false,
            welcomeDialogOpen: false,
            registerUsername: '',
            registerPassword: '',
            registerConfirmPassword: '',
            loginUsername: '',
            loginPassword: '',
            errorMessages: []
        };

        this.onClickRegister = this.onClickRegister.bind(this);
        this.closeRegisterDialog = this.closeRegisterDialog.bind(this);
        this.submitRegister = this.submitRegister.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.closeErrorDialog = this.closeErrorDialog.bind(this);
    }


    closeRegisterDialog() {
        this.setState({
            dialogOpen: false
        });
    }


    closeErrorDialog() {
        this.setState({
            errorDialogOpen: false
        });
    }


    onClickRegister() {
        this.setState({
            dialogOpen: true
        });
    }


    submitRegister() {
        let passed = this.registerInputSanityCheck();

        if (!passed) {
            this.setState({errorDialogOpen: true});
        }
        else {
            this.props.register(this.state.registerUsername, this.state.registerPassword,
                (res, err) => {
                    if (res) {
                        this.setState({welcomeDialogOpen: true});
                        setInterval(() => {
                            history.push('/');
                        }, 2000);
                    }
                    else if (err) {
                        let errors = [err.error.message];
                        this.setState({errorMessages: errors, errorDialogOpen: true});
                    }
                }, (err) => {
                    let errors = ['Unable to get a response from the server'];
                    this.setState({errorMessages: errors, errorDialogOpen: true});
                });
        }
    }


    submitLogin() {

    }


    withinRange = (str, min, max) => {
        return str.length >= min && str.length <= max;
    };


    registerInputSanityCheck() {
        let errors = [];
        let regex = new RegExp(/[a-zA-Z0-9_]/);
        let regexTest = regex.test(this.state.registerUsername);
        if (!regexTest)
            errors.push('Username must contain only [a-zA-Z0-9_].');

        let rangeTest = this.withinRange(this.state.registerUsername, 6, 20);
        if (!rangeTest)
            errors.push('Username must be between 6 to 20 characters.');

        regex = new RegExp(/[a-zA-Z0-9]/);
        regexTest = regex.test(this.state.registerPassword);
        if (!regexTest)
            errors.push('Password must be alphanumeric.');

        rangeTest = this.withinRange(this.state.registerPassword, 6, 20);
        if (!rangeTest)
            errors.push('Password must be between 6 to 20 characters.');

        if (errors.length === 0 && this.state.registerPassword !== this.state.registerConfirmPassword)
            errors.push('Confirmation password does not match password');


        this.setState({
            errorMessages: errors
        });

        return errors.length === 0;
    }


    onInputEdit = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    render() {
        return (
            <div style={styles.rootCtn}>
                <Dialog open={this.state.welcomeDialogOpen}>
                    <p style={styles.welcomeDialogText}>Welcome</p>
                </Dialog>

                <Dialog open={this.state.errorDialogOpen} onBackdropClick={this.closeErrorDialog}
                        onEscapeKeyDown={this.closeErrorDialog}
                >
                    <p style={styles.errorDialogText}>{this.state.errorMessages.join("\n")}</p>
                </Dialog>

                <Dialog
                    open={this.state.dialogOpen} onBackdropClick={this.closeRegisterDialog}
                    onEscapeKeyDown={this.closeRegisterDialog}
                    maxWidth="md"
                >
                    <div style={styles.registerDialog}>
                        <div style={styles.formCtn}>
                            <div style={styles.inputCtn}>
                                <Input style={styles.input} placeholder="Username" startAdornment={
                                    <InputAdornment position="start">
                                        <IconButton disabled>
                                            <PermIdentity/>
                                        </IconButton>
                                    </InputAdornment>
                                }
                                       value={this.state.registerUsername}
                                       onChange={this.onInputEdit}
                                       name="registerUsername"
                                />
                                <InputLabel style={styles.inputLabel}>
                                    Username must contain only the characters [a-z, A-Z, 0-9, _] and be between 6-20 characters
                                </InputLabel>
                            </div>
                            <div style={styles.inputCtn}>
                                <Input style={styles.input} placeholder="Password" type="password"
                                       startAdornment={
                                           <InputAdornment position="start">
                                               <IconButton disabled>
                                                   <Lock/>
                                               </IconButton>
                                           </InputAdornment>
                                       }
                                       value={this.state.registerPassword}
                                       onChange={this.onInputEdit}
                                       name="registerPassword"
                                />
                                <InputLabel style={styles.inputLabel}>
                                    Password must be alphanumeric and contains between 6-20 characters
                                </InputLabel>
                            </div>
                            <div style={styles.inputCtn}>
                                <Input style={styles.input} placeholder="Confirm Password" type="password"
                                       startAdornment={
                                           <InputAdornment position="start">
                                               <IconButton disabled>
                                                   <CheckCircle/>
                                               </IconButton>
                                           </InputAdornment>
                                       }
                                       value={this.state.registerConfirmPassword}
                                       onChange={this.onInputEdit}
                                       name="registerConfirmPassword"
                                />
                            </div>
                            <div style={styles.registerBtnCtn}>
                                <Button color="primary" variant="raised" onClick={this.submitRegister}
                                        fullWidth>
                                    Become a Code Snippler
                                </Button>
                            </div>
                        </div>
                    </div>
                </Dialog>


                <Card style={styles.card}>
                    <div style={styles.formCtn}>
                        <div style={styles.inputCtn}>
                            <Input style={styles.input} placeholder="Username" startAdornment={
                                <InputAdornment position="start">
                                    <IconButton disabled>
                                        <PermIdentity/>
                                    </IconButton>
                                </InputAdornment>
                            }
                                   value={this.state.loginUsername}
                                   onChange={this.onInputEdit}
                                   name="loginUsername"
                            />
                        </div>
                        <div style={styles.inputCtn}>
                            <Input style={styles.input} placeholder="Password" type="password" startAdornment={
                                <InputAdornment position="start">
                                    <IconButton disabled>
                                        <Lock/>
                                    </IconButton>
                                </InputAdornment>
                            }
                                   value={this.state.loginPassword}
                                   onChange={this.onInputEdit}
                                   name="loginPassword"
                            />
                        </div>
                        <div style={styles.buttonCtn}>
                            <Button color="primary" variant="raised" onClick={this.submitLogin}>Login</Button>
                        </div>

                        <h3 style={styles.registerText}>Don't have an account? <a href="javascript:void(0)"
                                                                                  onClick={this.onClickRegister}>Register</a></h3>
                    </div>
                </Card>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}


export default connect(mapStateToProps, {login, register})(LoginPage);