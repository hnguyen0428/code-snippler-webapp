import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {fetchPopularSnippets} from "../../../redux/actions/snippetActions";
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

    render() {
        let snippets = [];
        this.state.popularIds.forEach(id => {
            if (this.props.snippets.byIds[id])
                snippets.push(this.props.snippets.byIds[id]);
        });

        return (
            <div style={styles.rootCtn}>
                <SnippetsList style={styles.snippetsCtn} snippets={snippets}/>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        snippets: state.snippets
    };
}


export default withRouter(connect(mapStateToProps, {fetchPopularSnippets})(HomePage));