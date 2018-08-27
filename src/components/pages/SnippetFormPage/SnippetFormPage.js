import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AceEditor from 'react-ace';

import {styles} from './styles';
import history from '../../../root/history';

import {supportedLanguages, languagesMap} from '../../../constants/languages';
import {writeAceConfig as aceConfig, editorTheme} from '../../../constants/AceConfig';
import {createSnippet, updateSnippet, fetchSnippet} from '../../../redux/actions/snippetActions';
import {showAlert, showBinaryAlert, closeBinaryAlert} from '../../../redux/actions/alertActions';
import {resetOverridePath} from '../../../redux/actions/routerActions';


class SnippetFormPage extends Component {
    constructor(props) {
        super(props);

        const params = new URLSearchParams(this.props.location.search);
        let snippetId = params.get('snippetId');

        this.state = {
            language: {
                value: '',
                error: false,
                errorMsg: ''
            },
            mode: '',
            code: '',
            title: {
                value: '',
                error: false,
                errorMsg: ''
            },
            description: {
                value: '',
                error: false,
                errorMsg: ''
            },
            updating: snippetId !== null,
            snippetId: snippetId
        };
    }


    componentWillMount() {
        const params = new URLSearchParams(this.props.location.search);
        let snippetId = params.get('snippetId');

        if (snippetId !== null) {
            let snippet = this.props.snippets.byIds[snippetId];
            if (snippet) {
                this.setState({
                    title: {...this.state.title, value: snippet.title},
                    description: {...this.state.description, value: snippet.description},
                    language: {...this.state.language, value: snippet.languageName},
                    code: snippet.code,
                    mode: languagesMap[snippet.languageName.toLowerCase()]
                });
            }
            else {
                this.props.fetchSnippet(snippetId, {showUserDetails: true}, (res, err) => {
                    let snippet = res.data;
                    this.setState({
                        title: {...this.state.title, value: snippet.title},
                        description: {...this.state.description, value: snippet.description},
                        language: {...this.state.language, value: snippet.languageName},
                        code: snippet.code,
                        mode: languagesMap[snippet.languageName.toLowerCase()]
                    });
                });
            }
        }
    }


    onEditorValidate = (object) => {
        console.log(object);
    };


    handleLanguageChange = (event) => {
        this.setState({
            language: {...this.state.language, value: event.target.value},
            mode: languagesMap[event.target.value.toLowerCase()]
        });
    };


    onCodeEditing = (value) => {
        this.setState({
            code: value
        });
    };


    onEditingForm = (event) => {
        this.setState({
            [event.target.name]: {...this.state[event.target.name], value: event.target.value}
        });
    };


    onClickSubmit = () => {
        let passed = this.sanityCheck();
        if (!passed)
            return;

        const params = {
            title: this.state.title.value,
            description: this.state.description.value,
            language: this.state.language.value,
            code: this.state.code
        };

        const resCallback = (res, err) => {
            if (res) {
                let prevPath = this.props.router.prevPath;
                let overridePath = this.props.router.overridePath;
                if (overridePath)
                    history.push(overridePath);
                else
                    history.push(prevPath);

                this.props.resetOverridePath();
                this.props.closeBinaryAlert();
            }
        };

        const createSnippetAction = () => {
            this.props.createSnippet(params, resCallback);
        };

        const updateSnippetAction = () => {
            this.props.updateSnippet(this.state.snippetId, params, resCallback);
        };

        const action = this.state.updating ? {callback: updateSnippetAction} : {callback: createSnippetAction};
        const title = this.state.updating ? 'Update?' : 'Post?';
        const message = this.state.updating ? 'Do you want to update this snippet?' :
            'Do you want to post this snippet';

        this.props.showBinaryAlert(title, message, null, action);
    };


    sanityCheck = () => {
        let passed = true;
        let errors = {
            title: {...this.state.title},
            description: {...this.state.description},
            language: {...this.state.language}
        };

        if (this.state.title.value.length === 0) {
            passed = false;
            errors.title.error = true;
            errors.title.errorMsg = 'Title must not be empty';
        }

        if (this.state.language.value.length === 0) {
            passed = false;
            errors.language.error = true;
            errors.language.errorMsg = 'Language/Technology must be chosen';
        }

        if (this.state.code.length === 0) {
            // If passed before then show the alert, but if there are other errors, don't show
            // the alert
            if (passed) {
                this.props.showAlert('Error', 'Cannot submit empty code');
            }
            passed = false;
        }

        if (!passed)
            this.setState(errors);
        else
            this.setState({
                language: {
                    ...this.state.language,
                    error: false,
                    errorMsg: ''
                },
                title: {
                    ...this.state.title,
                    error: false,
                    errorMsg: ''
                },
                description: {
                    ...this.state.description,
                    error: false,
                    errorMsg: ''
                }
            });

        return passed;
    };


    render() {
        return (
            <div style={styles.rootCtn}>
                <div style={styles.contentCtn}>
                    <FormControl error={this.state.title.error} style={styles.textField}>
                        <TextField
                            name="title"
                            label="Title"
                            multiline
                            placeholder="Title of your Snippet"
                            fullWidth
                            value={this.state.title.value}
                            error={this.state.title.error}
                            onChange={this.onEditingForm}
                        />
                        {this.state.title.error
                        && <FormHelperText>{this.state.title.errorMsg}</FormHelperText>}
                    </FormControl>

                    <FormControl error={this.state.description.error} style={styles.textField}>
                        <TextField
                            name="description"
                            label="Description"
                            multiline
                            placeholder="Describe what your snippet is about..."
                            fullWidth
                            value={this.state.description.value}
                            error={this.state.description.error}
                            onChange={this.onEditingForm}
                        />
                        {this.state.description.error &&
                        <FormHelperText>{this.state.description.errorMsg}</FormHelperText>}
                    </FormControl>

                    <FormControl error={this.state.language.error} style={styles.textField}>
                        <InputLabel>Language/Technology</InputLabel>

                        <Select
                            value={this.state.language.value}
                            onChange={this.handleLanguageChange}
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

                        {this.state.language.error &&
                        <FormHelperText>{this.state.language.errorMsg}</FormHelperText>}
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
                        onValidate={this.onEditorValidate}
                    />

                    <Button
                        style={styles.postBtn}
                        variant="raised"
                        color="primary"
                        onClick={this.onClickSubmit}
                    >
                        {this.state.updating ? "Update" : "Post"}
                    </Button>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        auth: state.auth,
        snippets: state.snippets,
        router: state.router
    };
}


export default withRouter(connect(mapStateToProps, {
    createSnippet,
    showAlert,
    showBinaryAlert,
    resetOverridePath,
    closeBinaryAlert,
    updateSnippet,
    fetchSnippet
})(SnippetFormPage));