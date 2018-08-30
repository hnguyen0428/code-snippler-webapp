import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core';
import history from '../../../root/history';

import AceEditor from 'react-ace';

import CommentsList from '../../dumb/CommentsList/CommentsList';

import {styles, materialStyles} from './styles';

import {fetchSnippet, resetShouldIncreaseView, fetchComments, createComment} from "../../../redux/actions/snippetActions";
import {overridePath} from "../../../redux/actions/routerActions";

import Edit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';

import {languagesMap} from '../../../constants/languages';

import 'brace/theme/github';
import 'brace/theme/xcode';
import 'brace/theme/tomorrow';


import {readAceConfig as aceConfig, editorTheme} from '../../../constants/AceConfig';

for (let language in languagesMap) {
    let mode = languagesMap[language];
    require(`brace/mode/${mode}`);
}

const moment = require('moment');


class SnippetDetailsPage extends Component {
    constructor(props) {
        super(props);

        this.queryingComments = false;

        this.state = {
            params: {},
            commentIds: [],
            commentText: ''
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

        this.queryComments();
    }


    queryComments = () => {
        if (!this.queryingComments) {
            this.queryingComments = true;
            this.props.fetchComments(this.props.match.params.snippetId, {showUserDetails: true},
                (res, err) => {
                    this.queryingComments = false;
                    if (res) {
                        let comments = res.data;
                        let commentIds = [];
                        comments.forEach(comment => {commentIds.push(comment.commentId)});

                        this.setState({
                            commentIds: commentIds
                        });
                    }
                });
        }
    };


    onClickEdit = () => {
        this.props.overridePath(this.props.location.pathname);
        history.push('/snippet?snippetId=' + this.props.match.params.snippetId);
    };


    onClickUsername = () => {
        let snippetId = this.props.match.params.snippetId;
        let snippet = this.props.snippets.byIds[snippetId];

        if (this.props.auth.loggedIn && snippet.userId === this.props.auth.currentUser.userId)
            history.push('/user/me');
        else
            history.push('/user/' + snippet.userId);
    };

    onChangeComment = (event) => {
        this.setState({commentText: event.target.value});
    };

    onClickComment = () => {
        this.props.createComment(this.props.match.params.snippetId, {
            content: this.state.commentText
        }, (res, err) => {
            if (res) {
                this.setState({commentText: ''});
            }
        });
    };


    render() {
        let snippetId = this.props.match.params.snippetId;
        let snippet = this.props.snippets.byIds[snippetId];

        const {classes} = this.props;


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

            let comments = [];
            this.state.commentIds.forEach(id => {
                if (this.props.comments.byIds[id])
                    comments.push(this.props.comments.byIds[id]);
            });

            return (
                <div style={styles.rootCtn}>
                    <div style={styles.contentCtn}>
                        <div style={styles.metadataCtn}>
                            <div style={styles.actionsCtn}>
                                <div style={styles.usernameCtn}>
                                    <IconButton style={styles.profileIcon} onClick={this.onClickUsername}>
                                        <Avatar>
                                            {username.substr(0, 1).toUpperCase()}
                                        </Avatar>
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

                            <br/>

                            <InputLabel style={styles.header}>{snippet.title}</InputLabel>


                            <div style={styles.descriptionCtn}>
                                {snippet.description &&
                                    <TextField
                                        hintText="MultiLine with rows: 2 and rowsMax: 4"
                                        multiline
                                        value={snippet.description}
                                        style={styles.description}
                                        fullWidth
                                        disabled
                                        InputProps={{disableUnderline: true, classes: {input: classes.label}}}
                                    />
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

                        <TextField
                            style={styles.commentTextField}
                            placeholder="Add a comment..." fullWidth
                            helperText={
                                <Button color="primary"
                                        disabled={this.state.commentText.length === 0}
                                        onClick={this.onClickComment}
                                >
                                    Comment
                                </Button>
                            }
                            FormHelperTextProps={{style: styles.commentBoxBtn}}
                            InputProps={
                                {
                                    startAdornment:
                                    <Avatar style={styles.commentBoxAvatar}>
                                        {username.substr(0, 1).toUpperCase()}
                                    </Avatar>,
                                    onChange: this.onChangeComment
                                }
                            }
                            value={this.state.commentText}
                        />
                        <CommentsList style={styles.commentsList} comments={comments}/>
                    </div>
                </div>
            );
        }
        return <div/>;
    }
}


function mapStateToProps(state) {
    return {
        auth: state.auth,
        snippets: state.snippets,
        users: state.users,
        comments: state.comments
    };
}


export default withRouter(connect(mapStateToProps,
    {
        fetchSnippet,
        resetShouldIncreaseView,
        overridePath,
        fetchComments,
        createComment
    }
)(withStyles(materialStyles)(SnippetDetailsPage)));