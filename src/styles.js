import { createUseStyles } from 'react-jss';

const useGlobalStyles = createUseStyles({
    window: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 1em',
    },
    section: {
        maxWidth: '1200px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    section_row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    section_column: {
        flexDirection: 'column',
    },
    title: {
        margin: '0 0 16px',
        padding: 0,
        fontFamily: 'open sans,Helvetica,sans-serif',
        fontWeight: 300,
        fontSize: '2em',
        textAlign: 'center',
    },
    description: {
        textAlign: 'left',
        lineHeight: 1.65,

        '@media screen and (min-width: 600px)': {
            textAlign: 'center',
        }

    },

    // window sizing
    two_thirds: {
        width: '100%',
        '@media screen and (min-width: 600px)': {
            width: '66%',
        }
    } 
});

export {  useGlobalStyles }