import React, { Component } from 'react';
import {connect} from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Tooltip from '@material-ui/core/Tooltip';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Add from '@material-ui/icons/Add';
import Code from '@material-ui/icons/Code';

import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/github';
import {Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import history from './history'

import {logout} from "../redux/actions/authActions";
import {showBinaryAlert, closeBinaryAlert} from "../redux/actions/alertActions";

import CreateSnippetPage from '../components/pages/CreateSnippetPage/CreateSnippetPage';
import LoginPage from '../components/pages/LoginPage/LoginPage';
import SnippetDetailsPage from '../components/pages/SnippetDetailsPage/SnippetDetailsPage';
import HomePage from '../components/pages/HomePage/HomePage';

import store from '../redux/store';
import {ALERT_INACTIVE, ALERT_ACTIVE} from '../redux/actions/types';

import {styles} from './styles';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }


    handleToggle = () => {
        this.setState(state => ({ open: !this.state.open }));
    };


    redirectToLogin = () => {
        history.push('/login');
        this.props.closeBinaryAlert();
    };


    handleAddSnippet = () => {
        if (!this.props.auth.loggedIn) {
            let actionOne = {title: 'Dismiss'};
            let actionTwo = {title: 'Sign In', callback: this.redirectToLogin};
            if (!this.props.auth.loggedIn)
                this.props.showBinaryAlert('Sign In?', 'To create a snippet, you must sign in', actionOne, actionTwo);
        }
    };


    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    };


    handleLogout = event => {
        this.setState({ open: false });
        this.props.logout();
        window.location.reload();
    };


    handleSignIn = event => {
        this.setState({ open: false });
        history.push('/login');
    };


    closeDialog = (event) => {
        store.dispatch({
            type: ALERT_INACTIVE
        });
    };


    render() {
        const { open } = this.state;

        return (
            <div style={styles.app}>
                <Dialog id="General Alert"
                        open={this.props.alert.generalAlert.active}
                        onBackdropClick={this.closeDialog}
                        onEscapeKeyDown={this.closeDialog}>
                    { this.props.alert.generalAlert.title && (
                        <DialogTitle>{this.props.alert.generalAlert.title}</DialogTitle>
                    )}
                    <DialogContent>
                        <DialogContentText style={{whiteSpace: 'pre-line'}}>
                            {this.props.alert.generalAlert.message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeDialog} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog id="Binary Alert"
                        open={this.props.alert.binaryAlert.active}
                        onBackdropClick={this.closeDialog}
                        onEscapeKeyDown={this.closeDialog}>
                    { this.props.alert.binaryAlert.title && (
                        <DialogTitle>{this.props.alert.binaryAlert.title}</DialogTitle>
                    )}
                    <DialogContent>
                        <DialogContentText style={{whiteSpace: 'pre-line'}}>
                            {this.props.alert.binaryAlert.message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.alert.binaryAlert.actionOne} color="primary">
                            {this.props.alert.binaryAlert.actionOneTitle}
                        </Button>
                        <Button onClick={this.props.alert.binaryAlert.actionTwo} color="primary">
                            {this.props.alert.binaryAlert.actionTwoTitle}
                        </Button>
                    </DialogActions>
                </Dialog>

                <AppBar style={styles.navBar}>
                    <div style={styles.navItemsCtn}>
                        <div style={styles.navBarButtonsCtn}>
                            <Button href="/" style={styles.navBarTitle}>
                                Code Snippler
                            </Button>
                        </div>
                        <div style={styles.loginButtonCtn}>
                            <Tooltip disableFocusListener disableTouchListener title="Add a Snippet">
                                <IconButton
                                    onClick={this.handleAddSnippet}
                                >
                                    <Add style={styles.iconColor}/>
                                </IconButton>
                            </Tooltip>

                            <IconButton
                                onClick={this.handleToggle}
                                buttonRef={node => {this.anchorEl = node;}}
                            >
                                <AccountCircle style={styles.iconColor}/>
                            </IconButton>

                            <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={this.handleClose}>
                                                {this.props.auth.loggedIn ? (
                                                    <MenuList>
                                                        <MenuItem style={styles.usernameMenuItem}
                                                                  onClick={this.handleClose}>
                                                            {this.props.auth.currentUser.username}
                                                        </MenuItem>
                                                        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                                                    </MenuList>
                                                ) : (
                                                    <MenuList>
                                                        <MenuItem onClick={this.handleSignIn}>Sign In</MenuItem>
                                                    </MenuList>
                                                )}
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </div>
                    </div>
                </AppBar>
                <div style={{height: '45px'}}/>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <Route exact path="/snippet" component={CreateSnippetPage}/>
                        <Route exact path="/login" component={LoginPage}/>
                        <Route exact path="/snippet/:snippetId" component={SnippetDetailsPage}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        auth: state.auth,
        alert: state.alert
    }
}


export default connect(mapStateToProps, {logout, showBinaryAlert, closeBinaryAlert})(App);