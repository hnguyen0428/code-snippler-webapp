import React, { Component } from 'react';
import {connect} from 'react-redux';


class LoginPage extends Component {
    render() {
        return (
            <div>
                <h1>Login Page</h1>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {

    };
}


export default connect(mapStateToProps, {})(LoginPage);