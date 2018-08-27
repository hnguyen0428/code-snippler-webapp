import {theme} from '../../../constants/GlobalStyles';


export const styles = {
    rootCtn: {
        marginTop: '20px',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: theme.backgroundColor
    },
    editButton: {
        alignSelf: 'flex-end',
    },
    contentCtn: {
        width: '800px',
    },
    username: {
        cursor: 'pointer'
    },
    dateLabel: {
        fontSize: '12px',
        whiteSpace: 'pre-line',
        lineHeight: '1.5em'
    },
    metadataCtn: {
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        fontSize: '38px',
        fontFamily: 'Lucida Grande, Sans Serif',
        fontWeight: '300'
    },
    descriptionCtn: {
        width: '85%',
        alignSelf: 'center',
        marginTop: '15px',
        marginBottom: '30px'
    },
    description: {
        fontSize: '15px',
        fontFamily: 'Lucida Grande, Sans Serif'
    },
    editor: {
        height: '600px',
        width: 'inherit'
    }
};