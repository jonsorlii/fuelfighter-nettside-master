import React from 'react'
import { A } from 'hookrouter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../_styles/header.css'

import logo_black from '../assets/logo_black.png'
import logo_white from '../assets/logo.png'
import { faFacebookF, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'

export default function Header({floating}) {
    return (
        <nav className={floating && "floating"}>
            <div className="nav-content" >
                <ul>
                    <li><A href="/" id="logo"><img alt="DNV Fuel Fighter: Home" src={floating ? logo_white : logo_black} /></A></li>
                    <li><A href="/blog">Blog</A></li>
                    <li><A href="/sponsors">Sponsors</A></li>
                    <li><A href="/team">Team</A></li>
                    <li><A href="/about">About</A></li>
                    <li><A href="/history">History</A></li>
                    <li><A href="/join">Join</A></li>
                </ul>
                <ul id="header-social">
				    <li><a href="https://www.facebook.com/DnvFuelFighter/" title="facebook" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF} /></a></li>
				    <li><a href="https://www.instagram.com/dnv_fuelfighter/" title="instagram" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a></li>
				    <li><a href="https://www.youtube.com/user/EcoMarathonNTNU" title="youtube" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faYoutube} /></a></li>
				    <li><a href="https://www.linkedin.com/company/22290458/" title="linkedin" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a></li>
                </ul>
            </div>
        </nav>
    )
}