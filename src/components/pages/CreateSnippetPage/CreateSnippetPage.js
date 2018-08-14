import React, { Component } from 'react';
import {connect} from 'react-redux';


class CreateSnippetPage extends Component {
    render() {
        return (
            <div>
                <h1>Create Snippet Page</h1>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {

    };
}


export default connect(mapStateToProps, {})(CreateSnippetPage);