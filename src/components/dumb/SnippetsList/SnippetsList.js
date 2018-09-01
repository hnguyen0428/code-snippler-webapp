import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SnippetItem from '../../smart/SnippetItem/SnippetItem';

import {styles} from './styles';


class SnippetsList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    renderSnippet(snippet) {
        return (
            <SnippetItem style={styles.snippetItem} snippetId={snippet.snippetId}/>
        );
    }

    render() {
        let snippets = this.props.snippets;

        return (
            <List style={this.props.style}>{snippets.map(this.renderSnippet)}</List>
        );
    }
}


SnippetsList.propTypes = {
    snippets: PropTypes.array.isRequired
};


export default SnippetsList;