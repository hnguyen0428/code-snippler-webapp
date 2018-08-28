import {theme} from "../../../constants/GlobalStyles";

export const styles = {
    rootCtn: {
        marginTop: '20px',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: theme.backgroundColor,
    },
    contentCtn: {
        width: '800px',
    },
    usernameCtn: {
        height: '40px',
        marginBottom: '40px'
    },
    profileIcon: {
        marginRight: '10px'
    },
    username: {
        height: '100%',
        whiteSpace: 'pre-line',
        lineHeight: '1.4em',
        fontSize: '15px'
    },
    snippetsCtn: {
        width: '100%'
    }
};

export const materialStyles = theme => ({
    indicator: {
        backgroundColor: '#494949',
    },
    tabLabel: {
        color: '#494949'
    }
});