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
import Toolbar from '@material-ui/core/Toolbar';
import PermIdentity from '@material-ui/icons/PermIdentity';

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


    onClickUsername = () => {

    };


    render() {
        let snippetId = this.props.match.params.snippetId;
        let snippet = this.props.snippets.byIds[snippetId];


        if (snippet) {
            let user = this.props.users.byIds[snippet.userId];
            let username = user ? user.username : '';

            let date = new Date(snippet.createdDate);
            date = moment(date).format("MMMM Do, YYYY");

            let updatedDate = null;
            if (snippet.updatedDate) {
                updatedDate = new Date(snippet.updatedDate);
                updatedDate = moment(updatedDate).format("MMMM Do, YYYY");
            }

            return (
                <div style={styles.rootCtn}>
                    <div style={styles.contentCtn}>
                        <div style={styles.metadataCtn}>
                            <div style={styles.actionsCtn}>
                                <div style={styles.usernameCtn}>
                                    <IconButton style={styles.profileIcon} onClick={this.onClickUsername}>
                                        <PermIdentity/>
                                    </IconButton>
                                    <InputLabel onClick={this.onClickUsername}
                                                style={styles.username}>
                                        {username}
                                    </InputLabel>
                                </div>

                                {/* Space in between */}
                                <div style={{flex: '1'}}/>

                                { this.props.auth.loggedIn && snippet.userId === this.props.auth.currentUser.userId &&
                                    <div style={styles.editButton}>
                                        <IconButton onClick={this.onClickEdit}>
                                            <Edit/>
                                        </IconButton>
                                    </div>
                                }
                            </div>

                            <div style={styles.dateCtn}>
                                { date &&
                                <InputLabel style={styles.dateLabel}>
                                    {date}
                                </InputLabel>
                                }
                                { updatedDate &&
                                <InputLabel style={styles.dateLabel}>
                                    Updated on: {updatedDate}
                                </InputLabel>
                                }
                            </div>
                            <br/>
                            <InputLabel style={styles.header}>{snippet.title}</InputLabel>

                            <div style={styles.descriptionCtn}>
                                <InputLabel style={styles.description}>{snippet.description}</InputLabel>
                            </div>
                        </div>
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