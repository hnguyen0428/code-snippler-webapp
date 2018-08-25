import React, { Component } from 'react';
import {connect} from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AceEditor from 'react-ace';

import {styles} from './styles';
import {supportedLanguages, languagesMap} from '../../../constants/languages';
import {aceConfig, editorTheme} from '../../../constants/AceConfig';
import {createSnippet} from '../../../redux/actions/snippetActions';


class CreateSnippetPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            language: '',
            mode: '',
            code: ''
        };
    }


    handleLanguageChange = (event) => {
        this.setState({
            language: event.target.value,
            mode: languagesMap[event.target.value.toLowerCase()]
        });
    };


    onCodeEditing = (value) => {
        this.setState({
            code: value
        });
    };


    onClickPost = () => {
        const params = {};
        this.props.createSnippet(params);
    };


    render() {
        return (
            <div style={styles.rootCtn}>
                <div style={styles.contentCtn}>
                    <TextField
                        label="Title"
                        multiline
                        style={styles.textField}
                        placeholder="Title of your Snippet"
                        fullWidth
                    />

                    <TextField
                        label="Description"
                        multiline
                        style={styles.textField}
                        placeholder="Describe what your snippet is about..."
                        fullWidth
                    />

                    <FormControl style={styles.textField}>
                        <InputLabel>Language/Technology</InputLabel>
                        <Select
                            value={this.state.language}
                            onChange={this.handleLanguageChange}
                            inputProps={{
                                name: 'language',
                                id: 'language',
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {supportedLanguages.map(language => {
                                return (
                                    <MenuItem value={language}>{language}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>

                    <AceEditor
                        id="ace-editor"
                        mode={this.state.mode}
                        theme={editorTheme}
                        style={styles.aceEditor}
                        showPrintMargin={false}
                        tabSize={4}
                        wrapEnabled
                        value={this.state.code}
                        setOptions={aceConfig}
                        onChange={this.onCodeEditing}
                    />

                    <Button
                        style={styles.postBtn}
                        variant="raised"
                        color="primary"
                        onClick={this.onClickPost}
                    >
                        Post
                    </Button>
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


export default connect(mapStateToProps, {createSnippet})(CreateSnippetPage);