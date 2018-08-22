import React, { Component } from 'react';
import {connect} from 'react-redux';

import {styles} from './styles';


class CreateSnippetPage extends Component {
    render() {
        return (
            <div style={styles.rootCtn}>
                <h1>Create Snippet Page</h1>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        auth: state.auth,
        snippets: state.snippets
    };
}


export default connect(mapStateToProps, {})(CreateSnippetPage);