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


// import SnipplerClient from './api/SnipplerClient';
// let client = new SnipplerClient({
//     baseUrl: 'http://localhost:8080',
//     clientKey: 'vEysoE5HxX_rRADv1BDJ_v19KoKun6x49p4rq3ZYVxxTtYFc9r-beDh--a1Y8E5GbCpOKEHgJhCvsrnrtbFRomI8TNRNEyStBzUe6UUtgc9gsKBV8bDf6O71j6mk_WA-nYrD-AHHIhf3RI8rls7vNHmQLyPHxA2CDEjiDEkMhYA'
// });
// client.snippet().getSnippet('5b5e29838bf2d8265b68e3ff');


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
                    <AceEditor
                        mode="java"
                        theme="github"
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{$blockScrolling: true}}
                    />
                </div>
            </ThemeProvider>
        );
    }
}

export default App;
