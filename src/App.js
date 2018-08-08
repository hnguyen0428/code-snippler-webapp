import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './assets/react-toolbox/theme.css';
import theme from './assets/react-toolbox/theme';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import Button from 'react-toolbox/lib/button/Button';
import Input from 'react-toolbox/lib/input/Input';

class App extends Component {
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
                </div>
            </ThemeProvider>
        );
    }
}

export default App;
