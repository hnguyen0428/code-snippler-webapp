import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';

import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';

import AceEditor from 'react-ace';

import SelectableChip from '../../dumb/SelectableChip/SelectableChip';

import {writeAceConfig as aceConfig} from '../../../constants/AceConfig';
import {supportedThemes, editorTheme, setEditorTheme} from '../../../constants/AceConfig';

import {styles} from './styles';

supportedThemes.forEach(theme => {
    require(`brace/theme/${theme.toLowerCase()}`);
});


class EditorSettingsDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            theme: editorTheme
        };
    }


    onClickChip = (chip, checked) => {
        let theme = chip.props.name.toLowerCase();
        this.setState({theme: theme});
    };


    onClickSave = () => {
        localStorage.setItem("aceTheme", this.state.theme);
        setEditorTheme(this.state.theme);

        if (this.props.onClickSave)
            this.props.onClickSave(this);
    };


    onClickBack = () => {
        if (this.props.onClickBack)
            this.props.onClickBack(this);
    };


    render() {
        let {...props} = this.props;

        return (
            <Dialog {...props}>
                <DialogContent style={styles.dialogCtn}>
                    {this.props.withBackButton &&
                    <IconButton onClick={this.onClickBack}>
                        <ArrowBackIos/>
                    </IconButton>
                    }
                    <DialogTitle>Choose Your Preferred Editor Theme</DialogTitle>
                    <div style={styles.contentCtn}>
                        <List style={styles.selectors}>
                            {supportedThemes.map(theme => (
                                <SelectableChip
                                    name={theme.toLowerCase()}
                                    label={theme}
                                    checked={this.state.theme === theme.toLowerCase()}
                                    onClick={this.onClickChip}
                                    checkedIcon={<RadioButtonChecked/>}
                                    icon={<RadioButtonUnchecked/>}
                                    chipColor="#595959"
                                    checkboxColor="black"
                                    textColor="white"
                                />
                            ))}
                        </List>

                        <AceEditor
                            mode="plain_text"
                            theme={this.state.theme}
                            style={styles.aceEditor}
                            showPrintMargin={false}
                            tabSize={4}
                            wrapEnabled
                            setOptions={aceConfig}
                        />
                    </div>
                    <Button style={styles.saveBtn} onClick={this.onClickSave} color="primary">
                        Save
                    </Button>
                </DialogContent>
            </Dialog>
        );
    }
}


EditorSettingsDialog.propTypes = {
    fullWidth: PropTypes.bool,
    maxWidth: PropTypes.bool,
    onBackdropClick: PropTypes.func,
    onClose: PropTypes.func,
    onEnter: PropTypes.func,
    onEntered: PropTypes.func,
    onEntering: PropTypes.func,
    onEscapeKeyDown: PropTypes.func,
    onExit: PropTypes.func,
    onExited: PropTypes.func,
    onExiting: PropTypes.func,
    open: PropTypes.bool,
    classes: PropTypes.object,
    withBackButton: PropTypes.bool,
    onClickBack: PropTypes.func,
    onClickSave: PropTypes.func
};


EditorSettingsDialog.defaultProps = {
    withBackButton: true
};


export default EditorSettingsDialog;