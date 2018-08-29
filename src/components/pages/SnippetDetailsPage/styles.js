import {theme} from '../../../constants/GlobalStyles';


export const styles = {
    rootCtn: {
        marginTop: '20px',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        height: 'auto',
        backgroundColor: theme.backgroundColor
    },
    editButton: {

    },
    contentCtn: {
        width: '800px',
        marginBottom: '50px'
    },
    actionsCtn: {
        flexDirection: 'row',
        display: 'flex'
    },
    usernameCtn: {
        height: '40px'
    },
    profileIcon: {
        marginRight: '5px'
    },
    username: {
        cursor: 'pointer',
        height: '100%'
    },
    dateCtn: {
        display: 'flex',
        flexDirection: 'column'
    },
    dateLabel: {
        fontSize: '12px',
        whiteSpace: 'pre-line',
        lineHeight: '1.5em',
    },
    metadataCtn: {

    },
    header: {
        fontSize: '34px',
        fontFamily: 'Lucida Grande, Sans Serif',
        fontWeight: '300',
    },
    descriptionCtn: {
        width: '85%',
        paddingLeft: '40px',
        marginTop: '15px',
        marginBottom: '30px'
    },
    description: {
        fontSize: '15px',
        fontFamily: 'Lucida Grande, Sans Serif',
        whiteSpace: 'pre-line',
        lineHeight: 0.5
    },
    editor: {
        height: '650px',
        width: 'inherit'
    }
};


export const materialStyles = {
    label: {
        color: '#595959'
    }
};