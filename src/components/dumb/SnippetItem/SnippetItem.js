import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

import IconButton from '../IconButton/IconButton';

import {styles} from './styles';

const bHeartIcon = require('../../../assets/icons/black_heart.png');
const rHeartIcon = require('../../../assets/icons/red_heart.png');
const viewIcon = require('../../../assets/icons/view_icon.png');
const thumbsDown = require('../../../assets/icons/thumbs_down.png');
const thumbsUp = require('../../../assets/icons/thumbs_up.png');


class SnippetItem extends Component {
    click() {
        console.log('yes');
    }


    render() {
        let snippet = this.props.snippet;

        // Merge style
        let rootCtn = styles.rootCtn;
        if (this.props.style) {
            rootCtn = {...rootCtn, ...this.props.style};
        }

        return (
            <ListItem style={rootCtn}>
                <div style={styles.leftCtn}>
                    <Button style={styles.language}>{snippet.languageName}</Button>
                </div>

                <div style={styles.middleCtn}>
                    <h3 style={styles.title}>{snippet.title}</h3>
                    <div style={styles.iconsCtn}>
                        <IconButton style={styles.iconCtn} src={bHeartIcon} text={snippet.savedCount}/>
                        <IconButton style={styles.iconCtn} src={thumbsUp} text={snippet.upvotes}/>
                        <IconButton style={styles.iconCtn} src={thumbsDown} text={snippet.downvotes}/>
                    </div>
                </div>


                <div style={styles.rightCtn}>
                    <IconButton style={styles.viewIcon} src={viewIcon} text={snippet.viewsCount}/>
                </div>
            </ListItem>
        );
    }
}


SnippetItem.propTypes = {
    snippet: PropTypes.object.isRequired
};


export default SnippetItem;