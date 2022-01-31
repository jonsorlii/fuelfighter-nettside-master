import React from 'react';
import { createUseStyles } from 'react-jss';

// components
import Header from '../_templates/Header'
import Footer from '../_templates/Footer'

// assets
import landingImage from '../assets/car_render_transparent_crop1.png';

const useStyles = createUseStyles({
    window: {
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    front_image: {
        position: 'absolute',
        width: '60%',
    },
    title: {
        color: 'white',
        opacity: 0.8,
		fontWeight: 'normal',
		fontSize: '64px',
		letterSpacing: '5px',
        textAlign: 'center',
        zIndex: 2,

		'@media (min-width: 1000px)': {
			fontSize: '92px',
		},

		'@media (max-width: 450px)': {
			fontSize: '13vw',
		}
    }
})

export default function PageNotFound() {
    
    const classes = useStyles();

    return (
        <>
            <Header floating/>
            <div className={classes.window} >
                <img alt="car from behind" className={classes.front_image} src={landingImage} />
                <span className={classes.title} >Page not found :(</span>
                <div style={{width: '100%', height: '35vh'}} ></div> { /* spacer */ }
            </div>
            <Footer />
        </>
    )
}