import React, { Component } from 'react';
import {connect} from 'react-redux';


class SnippetDetailsPage extends Component {
    render() {
        return (
            <div>
                <h1>Snippet Details Page</h1>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {

    };
}


export default connect(mapStateToProps, {})(SnippetDetailsPage);