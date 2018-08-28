import {theme} from '../../../constants/GlobalStyles';


export const styles = {
    rootCtn: {
        display: 'flex',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: theme.backgroundColor,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    contentCtn: {
        marginTop: '50px',
        display: 'flex',
        width: '37%',
        flexDirection: 'column',
    },
    textField: {
        marginTop: '7px',
        marginBottom: '7px'
    },
    aceEditor: {
        width: '100%',
        marginTop: '20px',
        marginBottom: '20px'
    },
    aceEditorCharCount: {
        alignSelf: 'flex-end'
    },
    postBtn: {
        marginTop: '20px'
    }
};