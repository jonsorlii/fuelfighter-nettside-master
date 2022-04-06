import React from 'react'

import '../_styles/sponsors.css'
import Header from '../_templates/Header'
import Footer from '../_templates/Footer'

// assets
import sponsorImage from '../assets/sponsor.png'

import DNVGL from '../assets/sponsors/colored/DNV.png'
import NTNU from '../assets/sponsors/colored/NTNU.png'
import Ouster from '../assets/sponsors/colored/Ouster.png'
import AlvaIndustries from '../assets/sponsors/colored/Alva_industries.svg'
import Eker from '../assets/sponsors/colored/Eker.PNG'
import Zolve from '../assets/sponsors/colored/Zolve.png'
import LindbergLund from '../assets/sponsors/colored/Lindberg_lund.png'
import SKF from '../assets/sponsors/colored/SKF.png'
import Altair from '../assets/sponsors/colored/Altair.svg'
import HPC from '../assets/sponsors/colored/HPC.png'
import TrondheimStaal from '../assets/sponsors/colored/Trondheim_staal.png'
import IDE from '../assets/sponsors/IDEhouse.png'
import SciDart from '../assets/sponsors/scichart.png'
import FourTest from '../assets/sponsors/colored/4test.png'
import VectorNav from '../assets/sponsors/colored/VectorNav.svg'
import MomentumIndustrial from '../assets/sponsors/colored/momentumIndustrial.jpg'
import nskog from '../assets/sponsors/colored/Nskog.png'
import EWGlassOgPlast from '../assets/sponsors/colored/EWGlassOgPlast.jpg'
import FRAMO from '../assets/sponsors/colored/FRAMO.png'
import NeptuneEnergy from '../assets/sponsors/colored/NeptuneEnergy.jpg'

export default function Sponsors() {
    return (
        <>
            <Header />
            <section>
                <div className="grid">
                    <div className="two-thirds">
                        <h1 className="heavy">Sponsors</h1>
                        <p>As a student organization we depend on the support from our sponsors. They support us both financially and by supporting us with components and services. We are therefore grateful for their contribution into the project.</p>
                        <img alt="hands formed as a heart" src={sponsorImage} width="64px" />
                    </div>
                </div>
            </section>
            <section style={{background: '#f8f8f8'}} >
                <div className="grid">
                    <h2>Main sponsor</h2>
                    <div className="sponsor-main two-thirds">
                        <img alt="DNV GL" src={DNVGL} />
                        <p>We are the independent expert in risk management and quality assurance. Driven by our purpose, to safeguard life, property and the environment, we empower our customers and their stakeholders with facts and reliable insights so that critical decisions can be made with confidence. As a trusted voice for many of the world’s most successful organizations, we use our knowledge to advance safety and performance, set industry benchmarks, and inspire and invent solutions to tackle global transformations.</p>
                        <a target="_blank" rel="noopener noreferrer" className="button flat suggested-action" href="https://www.dnv.com/" >Visit</a>
                    </div>
                </div>
            </section>
            <section>
                <div className="grid">
                    <h2>Platinum sponsors</h2>
                    <div className="sponsor third">
                        <img alt="Ouster" src={Ouster}  />
                        <p>Ouster is a team of software, hardware, business, and manufacturing experts building the next generation of high-resolution lidar sensors.<br/><br/></p>
                        <a target="_blank" rel="noopener noreferrer" href="https://ouster.com/" className="button flat">Visit</a>
                    </div>
                    <div className="sponsor third">
                        <img alt="Alva industries" src={AlvaIndustries} />
                        <p>Alva was founded to meet the growing global energy demand with renewable technologies. We develop electric generators for production of clean energy and electric motors to convert this energy into motion.<br/></p>
                        <a target="_blank" rel="noopener noreferrer" href="https://alvaindustries.com/" className="button flat">Visit</a>
                    </div>
                     <div className="sponsor third">
                        <img alt="VectorNav" src={VectorNav}  />
                        <p> Vectornav is a leader in high-performance navigation solutions, using the newest GPS/GNSS technologies. They supply systems to military, marine, aerospace and robotics industries worldwide. <br/> </p> 
                        <a target="_blank" rel="noopener noreferrer" href="https://www.vectornav.com/" className="button flat">Visit</a>
                    </div>
                </div>

                {/* 
                <div className="grid">
                    <h2>Gold sponsors</h2>
                </div>
                */}

                <div className="grid" >
                    <h2>Silver sponsors</h2>
                     <div className="sponsor third">
                        <img alt="Eker" src={Eker}  />
                        <p>The EKER team consists of highly skilled personnel from a wide range of disciplines. Industrial designers, art directors, graphic designers, engineers, tool- and mechanical technicians, economists and project leaders all work hand in hand to create the next high leveled product.<br/><br/><br/><br/></p>
                        <a target="_blank" rel="noopener noreferrer" href="https://ekerdesign.com/" className="button flat">Visit</a>
                    </div>
                    <div className="sponsor third" >
                        <img alt="4test" src={FourTest} />
                        <p>4Test is a leader in measurement solutions and expertise, building on the foundation of Keysight Technologies measurement equipment and technology. Our Mission is to provide engineers, Scientists and technicians the best-fit measurement solutions to help them to measure, test and validate the performance of their electronic, wireless and photonic devices. <br/> <br/></p>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.4test.no" className="button flat">Visit</a>
                    </div>
                    <div className="sponsor third">
                        <img alt="Zolve" src={Zolve} />
                        <p>Zolve originates from Trondheims technological environment, and offers consulting services to a wide range of companies. Zolve is spesialists in electronics, FPGA and software, with over 60 years of experience, a core part of Zolve's success comes from openness and close communication between customer and developer, which are essential in order to achieve the best result.</p>
                        <a target="_blank" rel="noopener noreferrer" href="https://zolve.no/" className="button flat">Visit</a>
                    </div> 
                    <div className="sponsor third">
                        <img alt="Framo" src={FRAMO} />
                        <p>Based in Bergen, Norway, Framo has been the recognized leader in pumping systems for the marine industry for more than half a century. Customers around the globe turn to them, both for pumps and for expertise in meeting their challenges. Discover Framos unique solutions on their website.<br/><br/><br/><br/><br/></p>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.framo.com/" className="button flat">Visit</a>
                    </div> 
                    <div className="sponsor third">
                        <img alt="NeptuneEnergy" src={NeptuneEnergy} />
                        <p>Neptune Energy is an independent global E&P company with operations across the North Sea, North Africa and Asia Pacific. The business had a production of 130,000 net barrels of oil equivalent per day in 2021. Transitioning towards a greener future and net zero by 2030, Neptune Energy have created a three-year environmental roadmap where the goal is to lower emissions and explore endeavors within electrification, carbon capture storage and hydrogen.</p>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.neptuneenergy.com/" className="button flat">Visit</a>
                    </div> 
                </div>
                <div className="grid">
                    <h2>Bronze sponsors</h2>
                    <div className="sponsor third">
                        <img alt="Lindberg & Lund" src={LindbergLund} />
                        <p>Lindberg & Lund AS imports and distributes construction adhesives, lubricants, release agents, composite materials, grouts and auxiliaries for the electronics industry.<br/><br/></p>
                        <a target="_blank" rel="noopener noreferrer" href="https://lindberg-lund.no/" className="button flat">Visit</a>
                    </div> 
                    <div className="sponsor third">
                        <img alt="SKF" src={SKF} />
                        <p>Our expertise is built on the development, design and manufacture of bearings, seals and lubrication systems.<br/><br/><br/></p>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.skf.com/" className="button flat">Visit</a>
                    </div>
                    <div className="sponsor third">
                        <img alt="Altair" src={Altair} />
                        <p>Solving your toughest challenges. Helping the innovators innovate, drive better decisions, and turning today’s problems into tomorrow’s opportunities.<br/><br/></p>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.altair.com/" className="button flat">Visit</a>
                    </div>
                    <div className="sponsor third">
                        <img alt="Nskog" src={nskog} />
                        <p>Norske Skog Skogn is actively working towards the green shift and the global circular economy through value creation of renewable resources such as norwegian 
                        spruce and hydro power. <br/><br/> <br/> <br/><br/></p>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.norskeskog.com/" className="button flat">Visit</a>
                    </div>
                     <div className="sponsor third">
                        <img alt="EWGlassOgPlast" src={EWGlassOgPlast} />
                        <p>Ew Glass & Plast primarily conducts wholesale trading activities with the purchase and sale of glass, plastic, fittings and accessories. They offer short delivery times on their products. EW Glass & Plast always aims to provide maximum service for all their customers, and grow their reputation as a supplier! <br/><br/></p>
                        <a target="_blank" rel="noopener noreferrer" href="http://www.ewglass.no/" className="button flat">Visit</a>
                    </div>
                </div>
                <div className="grid">
                    <h2>Partners</h2>
                    <div className="sponsor third">
                        <img alt="NTNU" src={NTNU}  />
                        <p>NTNU is a university with an international focus, with headquarters in Trondheim and campuses in Ålesund and Gjøvik. NTNU has a main profile in science and technology<br/><br/></p>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.ntnu.edu/" className="button flat">Visit</a>
                    </div>
                    <div className="sponsor third">
                        <img alt="HPC" src={HPC} />
                        <p>HPC performs services for industry and private customers. They want to be part of the development, and make your production possible. By using HPC, you will see that you save time, money, and increase quality.</p>
                        <a target="_blank" rel="noopener noreferrer" href="http://www.hpcomposites.no/" className="button flat">Visit</a>
                    </div> 
                    <div className="sponsor third">
                        <img alt="Trondheim stål" src={TrondheimStaal} />
                        <p>Trondheim Stål was founded in 1989 and is a steel contractor with main focus on steel structures for construction, civil engineering, smelters and the process industry.<br/><br/></p>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.trondheimstaal.com/" className="button flat">Visit</a>
                    </div>
                    <div className="sponsor third">
                        <img alt="IDE House" src={IDE} />
                        <p>IDÉ House of Brands delivers profile products, clothing, gifts, brands and promotional products to the corporate market.<br/><br/><br/></p>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.idegroup.no" className="button flat">Visit</a>
                    </div>
                    <div className="sponsor third">
                        <img alt="SciChart" src={SciDart} />
                        <p>SciChart is a cross-platform WPF (desktop), iOS, macOS, Android, Xamarin, and Web charting library. Used by customers across the world in sectors ranging from oil and gas and engineering, financial and trading to tech medical and research and more. The product is leading in its niche, because there is no competitor matching the performance of the drawing the data.</p>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.scichart.com/" className="button flat">Visit</a>
                    </div>
                    <div className="sponsor third">
                        <img alt="MomentumIndustrial" src={MomentumIndustrial} />
                        <p>Momentum is one of Sweden's leading suppliers of industrial components. They have a range of products in the areas of bearings, seals, gearboxes, electric motors, mechatronics, gearboxes and pumps. </p>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.momentum-industrial.com/" className="button flat">Visit</a>
                    </div> 
                </div>
            </section>
            <Footer />
        </>
    )
}