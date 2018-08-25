import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import Settings from '@material-ui/icons/Settings';

import {
    fetchPopularSnippets,
    fetchMostSavedSnippets,
    fetchMostViewsSnippets,
    fetchMostUpvotesSnippets,
    searchSnippets
} from "../../../redux/actions/snippetActions";

import SnippetsList from '../../dumb/SnippetsList/SnippetsList';

import {styles} from './styles';


class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            popularIds: []
        };
    }

    componentWillMount() {
        this.props.fetchPopularSnippets(null, (res, err) => {
            if (res) {
                let snippets = res.data;
                let snippetIds = [];
                snippets.forEach(snippet => {
                    snippetIds.push(snippet.snippetId);
                });
                this.setState({
                    popularIds: snippetIds
                });
            }
        });
    }


    handleToggle = () => {
        this.setState(state => ({ open: !this.state.open }));
    };


    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    };


    render() {
        let snippets = [];
        this.state.popularIds.forEach(id => {
            if (this.props.snippets.byIds[id])
                snippets.push(this.props.snippets.byIds[id]);
        });

        const { open } = this.state;

        return (
            <div style={styles.rootCtn}>
                <div style={styles.contentCtn}>
                    <IconButton buttonRef={node => {this.anchorEl = node;}}
                                onClick={this.handleToggle} style={styles.settingsIcon}>
                        <Settings/>
                    </IconButton>

                    <SnippetsList style={styles.snippetsCtn} snippets={snippets}/>

                    <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={this.handleClose}>
                                        <MenuList>
                                            <MenuItem disabled>Filter By</MenuItem>
                                            <MenuItem>Most Popular</MenuItem>
                                            <MenuItem>Most Views</MenuItem>
                                            <MenuItem>Most Upvoted</MenuItem>
                                            <MenuItem>Most Saved</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        auth: state.auth,
        snippets: state.snippets
    };
}


export default withRouter(connect(mapStateToProps, {
    fetchPopularSnippets,
    fetchMostSavedSnippets,
    fetchMostViewsSnippets,
    fetchMostUpvotesSnippets,
    searchSnippets
})(HomePage));