import React, { Component } from 'react';
import {withStyles} from '@material-ui/core';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import Edit from '@material-ui/icons/Edit';
import Done from '@material-ui/icons/Done';
import ThumbDownAlt from '@material-ui/icons/ThumbDownAlt';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';

import history from '../../../root/history';

import {upvoteComment, downvoteComment, updateComment} from '../../../redux/actions/commentActions';
import {showBinaryAlert, closeBinaryAlert} from '../../../redux/actions/alertActions';

import {styles, materialStyles} from './styles';


class CommentItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            commentText: this.props.comment.content
        };
    }


    redirectToLogin = () => {
        history.push('/login');
        this.props.closeBinaryAlert();
    };


    handleUpvoteComment = () => {
        let actionOne = {title: 'Dismiss'};
        let actionTwo = {title: 'Sign In', callback: this.redirectToLogin};
        if (!this.props.auth.loggedIn)
            this.props.showBinaryAlert('Sign In?', 'To upvote the comment, you must sign in', actionOne, actionTwo);

        const commentId = this.props.comment.commentId;
        const upvoted = this.props.comments.byIds[commentId].upvoted;
        if (upvoted !== undefined)
            this.props.upvoteComment(commentId, !upvoted);
    };

    handleDownvoteComment = () => {
        let actionOne = {title: 'Dismiss'};
        let actionTwo = {title: 'Sign In', callback: this.redirectToLogin};
        if (!this.props.auth.loggedIn)
            this.props.showBinaryAlert('Sign In?', 'To downvote the comment, you must sign in', actionOne, actionTwo);

        const commentId = this.props.comment.commentId;
        const downvoted = this.props.comments.byIds[commentId].downvoted;
        if (downvoted !== undefined)
            this.props.downvoteComment(commentId, !downvoted);
    };


    onEditComment = (event) => {
        if (this.state.editMode)
            this.setState({commentText: event.target.value});
    };


    onClickUsername = () => {
        if (this.props.auth.currentUser && this.props.auth.currentUser.userId === this.props.comment.userId)
            history.push('/user/me');
        else
            history.push('/user/' + this.props.comment.userId);
    };

    onClickEdit = () => {
        this.setState({editMode: true});
    };

    doneEditing = () => {
        this.props.updateComment(this.props.comment.commentId, {
            content: this.state.commentText
        }, (res, err) => {
            if (res)
                this.setState({editMode: false});
        })
    };


    render() {
        let {classes, style, comment, ...props} = this.props;

        style = {...styles.rootCtn, ...style, };

        return (
            <ListItem style={style} {...props}>
                <div style={styles.avatarCtn}>
                    {
                        comment.user &&
                            <IconButton onClick={this.onClickUsername}>
                                <Avatar>
                                    {comment.user.username.substr(0, 1).toUpperCase()}
                                </Avatar>
                            </IconButton>
                    }
                </div>

                <div style={styles.contentCtn}>
                    {
                        comment.user &&
                            <InputLabel style={styles.username} onClick={this.onClickUsername}>
                                {comment.user.username}
                            </InputLabel>
                    }

                    {
                        comment.content &&
                            <div style={styles.textfieldCtn}>
                                <TextField
                                    multiline
                                    value={this.state.editMode ? this.state.commentText : comment.content}
                                    style={styles.commentContent}
                                    fullWidth
                                    disabled={!this.state.editMode}
                                    onChange={this.onEditComment}
                                    InputProps={{disableUnderline: !this.state.editMode, classes: {input: classes.commentContent}}}
                                />

                                { this.props.auth.loggedIn && this.props.auth.currentUser.userId === comment.userId &&
                                    <IconButton style={styles.editBtn}
                                                onClick={this.state.editMode ? this.doneEditing : this.onClickEdit}>
                                        {
                                            this.state.editMode ?
                                                <Done/>
                                                :
                                                <Edit/>
                                        }
                                    </IconButton>
                                }
                            </div>
                    }
                    <div style={styles.toolbar}>
                        <Tooltip disableFocusListener disableTouchListener title="Upvote">
                            <IconButton
                                style={comment.upvoted ? {...styles.iconBtn, color: '#DE555C'} : styles.iconBtn}
                                onClick={this.handleUpvoteComment}
                            >
                                <ThumbUpAlt style={styles.icon}/>
                                {comment.upvotes}
                            </IconButton>
                        </Tooltip>
                        <Tooltip disableFocusListener disableTouchListener title="Downvote">
                            <IconButton
                                style={comment.downvoted ? {...styles.iconBtn, color: '#DE555C'} : styles.iconBtn}
                                onClick={this.handleDownvoteComment}
                            >
                                <ThumbDownAlt style={styles.icon}/>
                                {comment.downvotes}
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </ListItem>
        );
    }
}


function mapStateToProps(state) {
    return {
        auth: state.auth,
        comments: state.comments
    };
}


CommentItem.propTypes = {
    comment: PropTypes.object.isRequired
};


export default connect(mapStateToProps, {
    updateComment,
    upvoteComment,
    downvoteComment,
    showBinaryAlert,
    closeBinaryAlert
})(withStyles(materialStyles)(CommentItem));