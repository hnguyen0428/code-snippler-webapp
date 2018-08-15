import React, { Component } from 'react';
import {connect} from 'react-redux';

import AceEditor from 'react-ace';

import {styles} from './styles';

import {fetchSnippet} from "../../../redux/actions/snippetActions";

import 'brace/mode/java';
import 'brace/mode/c_cpp';
import 'brace/mode/javascript';
import 'brace/mode/python';
import 'brace/mode/css';
import 'brace/mode/html';
import 'brace/mode/php';
import 'brace/mode/ruby';
import 'brace/mode/swift';
import 'brace/theme/github';

import {languagesMap} from '../../../constants/languages';

const moment = require('moment');


class SnippetDetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params: {}
        }
    }

    componentWillMount() {
        let params = {
            showUserDetails: true
        };

        if (this.props.location.state && this.props.location.state.params && performance.navigation.type != PerformanceNavigation.TYPE_RELOAD)
            params = {...params, ...this.props.location.state.params};

        this.props.fetchSnippet(this.props.match.params.snippetId, params);
    }


    render() {
        let snippetId = this.props.match.params.snippetId;
        let snippet = this.props.snippets.byIds[snippetId];


        if (snippet) {
            let user = this.props.users.byIds[snippet.userId];
            let username = user ? user.username : '';

            let date = new Date(snippet.createdDate);
            date = moment(date).format("dddd MMMM Do, YYYY");

            return (
                <div style={styles.rootCtn}>
                    <div style={styles.contentCtn}>
                        <h3 style={styles.header}>Created by: {username} on {date}</h3>
                        <AceEditor
                            mode={languagesMap[snippet.languageName.toLowerCase()]}
                            theme="github"
                            readOnly
                            style={styles.editor}
                            value={snippet.code}
                            showPrintMargin={false}
                            tabSize={4}
                            wrapEnabled
                        />
                    </div>
                </div>
            );
        }
        return null;
    }
}


function mapStateToProps(state) {
    return {
        snippets: state.snippets,
        users: state.users
    };
}


export default connect(mapStateToProps, {fetchSnippet})(SnippetDetailsPage);