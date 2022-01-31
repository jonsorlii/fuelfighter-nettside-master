import React from 'react';
import styled, { keyframes } from 'styled-components';

// components
import Header from '../_templates/Header'
import Footer from '../_templates/Footer'
import Timeline from '../components/history/Timeline';
import SectionModule from '../components/history/SectionModule';
import { ViewMoreArrow } from '../components/general.style';

// assets
import bannerImage from '../assets/eco_marathon_track.jpg';
import car2019Image from '../assets/bil_portrett.jpg';
import car2018Image from '../assets/history/car_2018.jpg';
import car2017Image from '../assets/history/car_2017_2.jpg';
import car2016Image from '../assets/history/car_2016.jpg';
import car2015Image from '../assets/history/car_2015.jpg';
import car2014Image from '../assets/history/car_2014.jpg';
import car2013Image from '../assets/history/car_2013.jpg';
import car2012Image from '../assets/history/car_2012.jpg';
import car2011Image from '../assets/history/car_2011.jpg';
import car2010Image from '../assets/history/car_2010.jpg';
import car2009Image from '../assets/history/car_2009.jpg';
import car2021Image from '../assets/history/car2021.jpg';
const HistoryView = styled.div`
	width: 100%;
	background-color: black;
	position: relative;
`;

const HistorySection = styled.div`
	background-color: black;
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
`;

const bannerKeyframes = keyframes`
	0% {
		opacity: 0;
	}
	100% {
		opacity: 0.6;
	}
`;

const HistoryBanner = styled.img`
	opacity: 0;
	position: absolute;
	object-fit: cover;
	height: 100vh;
	width: 100%;

	animation-name: ${bannerKeyframes};
	animation-duration: 1s;
	animation-timing-function: ease-out;
	animation-delay: .5s;
	animation-iteration-count: 1;
	animation-direction: normal;
	animation-fill-mode: forwards;
	animation-play-state: running;
`;

const titleKeyFrames = keyframes`
  0% {
    opacity: 0;
    margin-top: 15px;
  }
  100% {
    opacity: 1;
    margin-top: 0px;
  }
`;

const Title = styled.h1`
	color: white;
	opacity: 0;
	font-size: 42px;

	animation-name: ${titleKeyFrames};
	animation-duration: 1s;
	animation-timing-function: ease-out;
	animation-delay: .5s;
	animation-iteration-count: 1;
	animation-direction: normal;
	animation-fill-mode: forwards;
	animation-play-state: running;
`;

export default function History() {
	return (
		<>
			<Header floating/>
			<HistorySection>
				<HistoryBanner src={bannerImage} alt="banner" />
				<Title>History</Title>
				<ViewMoreArrow style={{position: 'absolute', bottom: '30px'}} />
			</HistorySection>
			<HistoryView>
				<SectionModule title="2021" img = {car2021Image} text = "Same procedure as last year which meant the team were unable to compete in the Shell Eco Marathon for 2021 aswell. However, the team got to unveil their car for 2021 at Halsa, which was a successfull event!"/>
				<SectionModule title=" The Covid-19 outbreak" text="Our team was determined to continue the work on the car built last year to further develop and improve the car. But unfortunately due to the Covid-19 virus Shell Eco Marathon got canceled and the team didn't get the chance to show of the work." />
				<SectionModule title="FUELFIGHTER 5" img={car2019Image} text="The fall of 2018 the team spent planning a new car. In the winter and spring of 2019 we built our new car, FuelFighter 5, completely from scratch, everything possible in carbon fibre. The car weighed only 73kg and performed 181km/kWh, our best performance with any car ever. That led us to a 5th place in the main competition, and winners of the vehicle design award." />
				<SectionModule title="2018" img={car2018Image} text="After last years failed attempt, the 2018 DNV Fuel Fighter Team focused to improve the 2017 car. This was successfully done and the car drove into a second place in the UrbanConcept Battery-Electric class. The car was supposed to weigh 70 kg, but due to an error from the company providing the carbon fibers it gained 20 kg more weight." />
				<SectionModule title="FUELFIGHTER 4" img={car2017Image} text="In 2017 the team built a brand new car, the DNV Fuel Fighter 4. The car was built in just five months, but unfortunately failed to complete the race." />
				<SectionModule title="2016" img={car2016Image} text="2016 is the 9th consecutive year for the team to attain sponsorship ties with DNV. One car was made this year and was powered by a hydrogen engine and has a carbon carosserie. The car was only 1.00 meters high, 1.60 meters wide and 3.00 meters long with space for one person." />
				<SectionModule title="FUELFIGHTER 3" img={car2015Image} text="Two cars from NTNU participated in Shell Eco-marathon 2015. A new Urban Concept car in the hydrogen class which took 10,000 hours to create has been developed. The car for the Urban Concept class was created around the idea that driving the car from Oslo-Trondheim will only use 0.1 L of gasoline." />
				<SectionModule title="2014" img={car2014Image} text="The team in 2014 reach a result of  7th place in the Prototype battery electric category & 3rd place in the Urban Concept battery electric category A. This was the first time NTNU participated in the Prototype class." />
				<SectionModule title="2013" img={car2013Image} text="The project team consisted of 17 students who continued developing the chassis of 2012. The developments included the addition of solar panels to the car. The team won both the design and communication awards." />
				<SectionModule title="FUELFIGHTER 2" img={car2012Image} text="The team of 2012 decided to move away from the original fuel cell chassis and design a new electric car. The car was built completely in only one year and finished with an impressive fifth place in its class." />
				<SectionModule title="2011" img={car2011Image} text="After the failed attempts of the 2010 team the DNV Fuel Fighter 2011 team focused heavily on systems engineering and reliability and managed a second place in the Urban Concept Fuel Cell class. This year the car managed an equivalent of 957 km (595 mi) on one liter of gasoline." />
				<SectionModule title="2010" img={car2010Image} text="In 2010, a lot of variations and parts were changed in the car. However, the team failed to finish the race during the competition." />
				<SectionModule title="FuelFighter 1" img={car2009Image} text="The team of 2009 consisted of 10 masters students who created a 80kg hydrogen fuel cell car which competed in Germany. The team broke the previously competition record and finished first, while also achieving the lowest CO2 emissions of the competition." />
				<SectionModule title="2008" text="The first NTNU team to compete in Shell Eco-marathon was in 2008. The car was built over two years (2007-2008) by 13 students and, at the competition, the team finish second overall and won two special awards for communication and road safety." />
			</HistoryView>
			<Timeline />
			<Footer />
		</>
	)
}
