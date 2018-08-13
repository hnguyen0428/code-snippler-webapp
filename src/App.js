import React, { Component } from 'react';
import {connect} from 'react-redux';
import logo from './logo.svg';
import './App.css';
import './assets/react-toolbox/theme.css';
import theme from './assets/react-toolbox/theme';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import Button from 'react-toolbox/lib/button/Button';
import Input from 'react-toolbox/lib/input/Input';

import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/github';

import {fetchSnippet} from "./redux/actions/snippetActions";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    updateText = (text) => {
        this.setState({text: text});
    };

    componentWillMount() {
        this.props.fetchSnippet('5b71c8d96a16c56b89c8403f', {showCommentDetails: true, showUserDetails: true});
    }

    render() {
        let snippet = this.props.snippets.byIds['5b71c8d96a16c56b89c8403f'];
        let code = snippet ? snippet.code : '';

        return (
            <ThemeProvider theme={theme}>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Welcome to React</h1>
                    </header>

                    <Button raised primary>Test Button</Button>
                    <Input type='text' label='Name' name='name' maxLength={16} />
                    <AceEditor
                        mode="javascript"
                        theme="github"
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{$blockScrolling: true}}
                        value={code}
                        style={{width: '100%'}}
                    />
                    <button>React Button</button>
                    <div style={{width: '500px', marginLeft: '50%', transform: 'translateX(-50%)'}}>
                        <Input type='text' label='Name' name='name' maxLength={16} value={this.state.text} onChange={this.updateText} />
                    </div>

                </div>
            </ThemeProvider>
        );
    }
}


function mapStateToProps(state) {
    return {
        snippets: state.snippets
    }
}


export default connect(mapStateToProps, {fetchSnippet})(App);
