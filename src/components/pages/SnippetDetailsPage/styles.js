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
        height: '800px',
        width: '1000px',
    },
    header: {
        fontSize: '20px',
        fontFamily: 'Lucida Grande, Sans Serif'
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