import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import history from '../../../root/history';

import AceEditor from 'react-ace';

import {styles} from './styles';

import {fetchSnippet, resetShouldIncreaseView} from "../../../redux/actions/snippetActions";
import {overridePath} from "../../../redux/actions/routerActions";

import Edit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';

import 'brace/mode/java';
import 'brace/mode/c_cpp';
import 'brace/mode/javascript';
import 'brace/mode/python';
import 'brace/mode/css';
import 'brace/mode/html';
import 'brace/mode/php';
import 'brace/mode/ruby';
import 'brace/mode/swift';
import 'brace/mode/jsx';
import 'brace/theme/github';
import 'brace/theme/xcode';
import 'brace/theme/tomorrow';

import {languagesMap} from '../../../constants/languages';
import {readAceConfig as aceConfig, editorTheme} from '../../../constants/AceConfig';

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

        if (this.props.snippets.increaseViewcount)
            params = {...params, increaseViewcount: true};

        this.props.fetchSnippet(this.props.match.params.snippetId, params);
        this.props.resetShouldIncreaseView();
    }


    onClickEdit = () => {
        this.props.overridePath(this.props.location.pathname);
        history.push('/snippet?snippetId=' + this.props.match.params.snippetId);
    };


    render() {
        let snippetId = this.props.match.params.snippetId;
        let snippet = this.props.snippets.byIds[snippetId];


        if (snippet) {
            let user = this.props.users.byIds[snippet.userId];
            let username = user ? user.username : '';

            let date = new Date(snippet.createdDate);
            date = moment(date).format("dddd MMMM Do, YYYY");

            let updatedDate = null;
            if (snippet.updatedDate) {
                updatedDate = new Date(snippet.updatedDate);
                updatedDate = moment(updatedDate).format("dddd MMMM Do, YYYY");
            }

            return (
                <div style={styles.rootCtn}>
                    <div style={styles.contentCtn}>
                        { this.props.auth.loggedIn && snippet.userId === this.props.auth.currentUser.userId &&
                            <IconButton style={styles.editButton} onClick={this.onClickEdit}>
                                <Edit/>
                            </IconButton>
                        }

                        <InputLabel style={styles.header}>Created by: {username} on {date}</InputLabel>
                        {updatedDate &&
                            <div>
                                <br/>
                                <InputLabel style={styles.header}>Updated on: {updatedDate}</InputLabel>
                            </div>
                        }
                        <br/>
                        <InputLabel style={styles.header}>{snippet.title}</InputLabel>
                        <hr/>
                        <InputLabel style={styles.description}>{snippet.description}</InputLabel>
                        <AceEditor
                            id="ace-editor"
                            mode={languagesMap[snippet.languageName.toLowerCase()]}
                            theme={editorTheme}
                            readOnly
                            style={styles.editor}
                            value={snippet.code}
                            showPrintMargin={false}
                            tabSize={4}
                            wrapEnabled
                            setOptions={aceConfig}
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
        auth: state.auth,
        snippets: state.snippets,
        users: state.users
    };
}


export default withRouter(connect(mapStateToProps,
    {
        fetchSnippet,
        resetShouldIncreaseView,
        overridePath
    }
)(SnippetDetailsPage));