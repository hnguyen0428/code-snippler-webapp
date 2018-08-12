import React, { Component } from 'react';
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


import {Provider} from 'react-redux';

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

    render() {
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
                        mode="java"
                        theme="github"
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{$blockScrolling: true}}
                    />
                    <button>React Button</button>
                    <div style={{width: '500px', marginLeft: '50%', transform: 'translateX(-50%)'}}>
                        <Input type='text' label='Name' name='name' maxLength={16} value={this.state.text} onChange={this.updateText} />
                    </div>

                    <div style={{width: '500px', marginLeft: '50%', transform: 'translateX(-50%)'}}>
                        <DatePicker label='Birthdate' sundayFirstDayOfWeek/>
                    </div>

                </div>
            </ThemeProvider>
        );
    }
}

export default App;
