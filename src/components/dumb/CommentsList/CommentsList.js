import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import {styles} from './styles';


class CommentsList extends Component {
    constructor(props) {
        super(props);
    }


    isBottom = () => {
        let list = document.getElementById("commentsList");
        let bottom = document.getElementById("commentsListBottom");
        return bottom.getBoundingClientRect().bottom <= list.getBoundingClientRect().bottom;
    };


    trackScrolling = (event) => {
        if (this.isBottom() && this.props.onScrollToBottom) {
            this.props.onScrollToBottom(this);
        }
    };


    render() {
        const {comments, ...props} = this.props;


        return (
            <List id="commentsList" {...props} onScroll={this.trackScrolling}>
                {
                    comments.map((comment, i) => {
                        const id = "commentsListBottom";
                        return (
                            <ListItem id={i === comments.length - 1 ? id : undefined}>
                                {comment.content}
                            </ListItem>
                        );
                    })
                }
            </List>
        );
    }
}


CommentsList.propTypes = {
    onScrollToBottom: PropTypes.func,
    comments: PropTypes.array.isRequired
};


export default CommentsList;