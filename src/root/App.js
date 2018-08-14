import React, { Component } from 'react';
import {connect} from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';

import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/github';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';

import {fetchSnippet} from "../redux/actions/snippetActions";

import CreateSnippetPage from '../components/pages/CreateSnippetPage/CreateSnippetPage';
import LoginPage from '../components/pages/LoginPage/LoginPage';
import SnippetDetailsPage from '../components/pages/SnippetDetailsPage/SnippetDetailsPage';
import HomePage from '../components/pages/HomePage/HomePage';

import {styles} from './styles';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }


    render() {
        return (
            <div style={styles.app}>
                <AppBar style={styles.navBar}>
                    <div style={styles.navBarButtonsCtn}>
                        <Button href="/" style={styles.navBarTitle} >Code Snippler</Button>
                    </div>
                    <div style={styles.loginButtonCtn}>
                        <Button href="/login" style={styles.loginButton}>Log In</Button>
                    </div>
                </AppBar>
                <div style={{height: '45px'}}/>
                <Router>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <Route path="/snippet" component={CreateSnippetPage}/>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/snippet/:snippetId" component={SnippetDetailsPage}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {

    }
}


export default connect(mapStateToProps, {})(App);