import React from 'react';
import styled from 'styled-components';

// components
import Header from '../_templates/Header'
import Footer from '../_templates/Footer'
import PageBanner from '../components/PageBanner';
import joinService from '../_services/join.service';

// assets
import bannerImage from '../assets/team_seier.jpeg';
import { Title } from '../components/blog.style';

const Section = styled.div`
	overflow-x: hidden;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #F6F8FC;
	padding: 20px 0 50px 0;
	z-index: 0;
`;

const PositionsContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-wrap: wrap;
`;

const IntroCard = styled.div`
	vertical-align: top;
	padding: 40px;
	margin-top: 20px;
	position: relative;
	display: inline-block;
	overflow: hidden;
	width: 45%;
	min-width: 350px;
	background-color: white;
	font-size: 16px;
`;

function PositionCard({ position, description, linebreaker = "" }) {
	const Card = styled.div`
		position: relative;
		display: inline-block;
		background-color: white;
		vertical-align: top;
		border-radius: 3px;
		padding: 30px;
		margin: 15px;
		overflow: hidden;
		width: 350px;
		max-width: 90vw;
	`;

	const Title = styled.div`
		font-weight: bold;
		font-size: 18px;
		color: black;
	`;

	const Description = styled.div`
		padding: 10px 0;
		font-size: 14px;
		color: rgba(0,0,0,0.6);
	`;

	return (
		<Card>
			<Title>{position}</Title>
			<Description dangerouslySetInnerHTML={{ __html: description }} />
			<Description dangerouslySetInnerHTML={{ __html: linebreaker }} />
		</Card>
	)
}

function JoinForm() {
	const style = {
		form: {
			backgroundColor: 'white',
			padding: '20px',
			maxWidth: '600px',
			width: '100%',
		},
		text: {
			disclaimer: {
				margin: '20px',
				color: 'rgba(0,0,0,0.6)',
				textAlign: 'center',
			}
		},
		input: {
			text: {
				display: 'block',
				padding: '20px',
				marginBottom: '20px',
				backgroundColor: '#F6F8FC',
				borderRadius: '3px',
				border: 'none',
				width: '100%',
				fontSize: '18px',
				// precent textarea resize
				resize: 'none',
			},
			checkbox: {
				marginRight: '10px',
				backgroundColor: '#F6F8FC',
				width: '20px',
				height: '20px',
			},
			label: {
				paddingLeft: '10px',
				margin: '5px 0',
				fontSize: '18px',
				color: 'rgba(0,0,0,1)',
				display: 'flex',
				alignItems: 'center',
			},
			check: {
				paddingLeft: '10px',
				margin: '5px 0',
				fontSize: '18px',
				color: 'rgba(0,0,0,0.8)',
				display: 'flex',
				alignItems: 'center',
			},
			submit: {
				borderRadius: '3px',
				padding: '6px 9px',
				backgroundColor: '#011A2C',
				boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.05),inset 0 1px 0 0 rgba(255,255,255,.2),inset 0 -1px 0 0 rgba(255,255,255,.1),0 1px 3px rgba(0,0,0,.05),0 1px 2px rgba(0,0,0,.1)',
				color: 'white',
				cursor: 'pointer',
				float: 'right',
				fontSize: '16px',
				border: 'none',
			}
		}
	}

	const form = {
		firstname: '',
		lastname: '',
		email: '',
		description: '',
		//Change phonenumber to int
		phonenumber: '',
		selectedPositions: [],
	};

	const positions = ["Marketing", "Mechanical", "Autonomous", "Electrical", "Design", "Group Leader"];
	//const positions = ['Project Manager', 'Assistant project manager', 'Technical leader',  'Mechanical Group Leader', 'Autonomous Group Leader', 'Electrical Group Leader', 'Design Group Leader', 'Head of Finance', 'Head of Marketing', 'Software Group Leader']
	//const positions = ["Head of Finance", "Mechanical Group Leader", "Design Group Leader", "Marketing Group Leader", "Mechanical Member", "Design Member", "Software Member", "Autonomous Member", "Electrical Member", "Social Media", "Web Developer", "Photo and Video", "Graphical Design", "Business Relations", "Event Manager", "Open Application"];
	//const positions = ["Open application"];
	const handleCheckbox = (event, position) => {
		if (event.target.value && form.selectedPositions.indexOf(position) === -1) {
			form.selectedPositions.push(position);
		} else {
			form.selectedPositions.splice(form.selectedPositions.indexOf(position), 1);
		}
	}

	const handleInput = (event, key) => {
		form[key] = event.target.value;
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		const evaluation = joinService.evaluateForm(form);

		if (evaluation.length === 0) {
			joinService.sendForm(form)
				.then((result) => {
					if (result) {
						alert('Your application is sent. Please check your email for a confirmation');
					} else {
						alert('There was an error while sending your application. Please send your application to post@fuelfighter.no and inform about your issue');
					}
				}).catch(exception => {
					alert('There was an error while sending your application. Please send your application to post@fuelfighter.no and inform about your issue');
				});
		} else {
			evaluation.forEach(error => {
				alert(error);
			});
		}
	}

	return (
		<form onSubmit={handleSubmit} style={style.form} >
			<div style={style.text.disclaimer} >
				You will recieve a confirmation email when you submit your application. If you don`t, please send your application to post@fuelfighter.no and inform about your issue.
			</div>
			<span style={style.input.label}>Firstname</span>
			<input
				type="text"
				style={style.input.text}
				onChange={(event) => handleInput(event, 'firstname')}
				// placeholder="firstname"
				required
			/>
			<span style={style.input.label}>Lastname</span>
			<input
				type="text"
				style={style.input.text}
				onChange={(event) => handleInput(event, 'lastname')}
				// placeholder="firstname"
				required
			/>
			<span style={style.input.label}>Email</span>
			<input
				type="email"
				style={style.input.text}
				onChange={(event) => handleInput(event, 'email')}
				// placeholder="email"
				required
			/>
			<span style={style.input.label}>Phonenumber</span>
			<input
				type="phonenumber"
				style={style.input.text}
				onChange={(event) => handleInput(event, 'phonenumber')}
				// placeholder="email"
				required
			/>
			<span style={style.input.label}>About you and why you want to apply</span>
			<textarea
				rows={5}
				style={style.input.text}
				onChange={(event) => handleInput(event, 'description')}
				required
			/>
			<span style={style.input.label}>Select your desired position</span>
			{
				positions.map((position) =>
					<label
						style={style.input.check}
						key={position}
					>
						<input
							type="checkbox"
							style={style.input.checkbox}
							onChange={(e) => handleCheckbox(e, position)}
							name={position}
						/>
						{position}
					</label>
				)
			}
			<input
				type="submit"
				value="Submit application"
				style={style.input.submit}
			/>
		</form>
	);
}

export default function Join() {
	return (
		<>
			<Header floating />
			<PageBanner title="Join Us" image={bannerImage} />
			<Section>

				<IntroCard>
					As a cross-disciplinary project we need students from every field of study. We are usually a team of 45 students, and always make sure some of them are exchange students. We like to have a good mixture of people from every year of study, to get good group dynamic and a good work culture to make people want to continue over several years. {/*By being a part of our team you get 7.5 credits you can use in you study plan.*/}

				</IntroCard>
				<h2>Autonomus</h2> 
				<PositionsContainer>
					<PositionCard
						position="SLAM/Lidar"
						description= "To give the autonomous car a kind of vision for greater distances, a LiDAR (Light Detection and Ranging) is used. The main task for the team is to use the data published by the LiDAR and process it in a way so that the autonomous control-team can use it for steering, braking and acceleration of the car. SLAM is short for Simultaneous Localization and Mapping and is responsible for mapping an unknown environment, whilst keeping track of its position inside the map."
					/>
					<PositionCard
						position="Autonomous control"
						description= "The control system receives the desired steering angle and speed from the autonomous software on the onboard computer and makes it happen. It needs to be able to turn the steering wheel, engage the brakes,shut down if the driver manually brakes and be removable. It also receives the desired speed from the computer and transfers this data to the motorcontroller."
					/>
					<PositionCard
						position="Simulator"
						description= "Making an autonomous car is not a straightforward task. It is a process of trial and error, and testing is therefore one of the most important and useful things to do. However, it is difficult and time consuming to test on the actual car. Therefore, we have implemented a simulator for the system which simulates the driving physics and sensors, making testing much easier to carry out."
					/>
					<PositionCard
						position="Path tracking"
						description= "In order to make an autonomous car, it is not only necessary to figure out where we want to drive, but also how to make the car drive where we want. This part is also known as path tracking. It is crucial to have a good path tracking system to make an autonomous car. Without it the car would drive off the road and crash."
					/>
					<PositionCard
						position="Path planning and goal handling"
						description= "Path planning has two responsibilities. The first is to make a path to the goal using the map and sensor data. The second is to compute the linear and angular velocity reference values that make the car follow the path. Responsibility of goal handling is to find a suitable goal for the car from the map generated by SLAM."
					/>
					<PositionCard
						position="Camera"
						description= "The goal of the camera subsystem is to be capable of detecting lanes, obstacles and parking spots. This is done by using machine learning and other complex algorithms. The camera employed is a ZED 2 stereo camera. This makes us able to calculate the distance to different objects."
					/>					
				</PositionsContainer>
				<h2>Mechanical</h2> 
				<PositionsContainer>
					<PositionCard
						position="Group leader"
						description= "The mechanical group leader has the responsibility to ensure that all mechanical systems function according to specifications. This is done by keeping close contact and working with the team. The mechanical team designs, produces and tests the mechanical systems on the car. This is everything from the chassis to the steering system. The mechanical group leader is responsible for maintaining planning systems and coordination between different groups. The mechanical group leader should be structured and have an interest in creating high-performance mechanical systems"
					/>
					<PositionCard
						position="Front suspension"
						description= "The front suspension carries the majority of the weight while providing dampening. Being one of the most dangerous points of failure, the designs have to be analyzed and testet comprehensively. There has historically been a lot of freedom and change here, and this year we have a new system that has yet to be tested."
					/>
					<PositionCard
						position="Rear suspension"
						description= "The upcoming car will use trailing-arm rear suspension, which links the wheels to the chassis as well as carrying the motors, gear system, and rear brakes. One of the main goals this year is to swap as much aluminium with carbon fiber composite as possible."
					/>
					<PositionCard
						position="Steering"
						description= "The steering mechanism is the link between the driver and the front suspension, allowing the car to change direction. Over the years, creative solutions have been employed, which achieved extremely low weight, at the cost of reliablity. The new car will use a more reliable rack and pinion system."
					/>
					<PositionCard
						position="Brakes"
						description= "A four-disc hydraulic brake system is required to comply with the rules of the competition. The redundancy is for the driver's safety. As with everything else, the parts must be made as light as possible, and manage to fit in between all the other parts around the wheels.
						"
					/>
					<PositionCard
						position="Doors and windows"
						description= "Windows have to be shaped into the desired aerodynamic shape. This can be a challenge, both in terms of manufacturing and material selection. Doors pose a bigger challenge than what one might assume. Because the doors are designed to be extremely light, they may become somewhat flimsy. Due to the aerodynamic shape, it can become difficult to make hinges work properly. Custom hinges are therefore designed."
					/>
					<PositionCard
						position="Chassis"
						description= "The chassis is the component that is most difficult to manufacture, and by far the most expensive. For that reason, it gets a lot of focus. A composite analysis is performed to plan the layup, for which we use Altair HyperWorks. The 2022 car will be the first ever since 2008 to use a pre-impregnated carbon fiber composite. This is a big step up in both performance and expense. "
					/>
					<PositionCard
						position="Aerodynamics"
						description= "Aerodynamic drag is the factor with the largest impact on performance. We primarily use HyperWorks AcuSolve for analysis."
					/>
				</PositionsContainer>

				<h2>Electrical</h2>
				<PositionsContainer>
					<PositionCard
						position="Group leader"
						description= "As leader of the electrical team, you are responsible for making sure the electrical system is ready for the competition.  You will get insight in all the electronics needed to make an electric car, this includes everything from motors to the dashboard. Working on these systems you will gain knowledge about everything from hardware design to writing software. It is a great experience as you can influence the whole electrical system, and you get to help the team members when they encounter problems with their subsystems. Therefore the electrical leader should be structured and interested in both learning and teaching.
						"
					/>
					<PositionCard
						position="Motor controller"
						description= "The motor controller drives the car's motors. It is one of the most crucial systems for making the car draw as little power as possible."
					/>
					<PositionCard
						position="Driver interface"
						description= "The driver interface is the system that the driver uses to interact with the car, and with the outside world through lights, horn and wipes. A series of circuit boards in the steering wheel and the dashboard handles the inputs from the buttons on the steering wheel, and communicates through the CANbus."
					/>
					<PositionCard
						position="Battery management system"
						description= "The BMS handles over-current and -voltage protection of the battery cells. It is the 'guard' for the battery and makes sure that nothing critical happens while the car is in use."
					/>
					<PositionCard
						position="Power distribution"
						description= "The power distribution system makes sure that all the different components and subsystems get the correct voltage and enough power to work properly.
						"
					/>
					<PositionCard
						position="Telemetry"
						description= "The telemetry is responsible for transmitting data from the driver inputs and the car's sensor network. The data is transmitted to a ground station, where it is visualized and analyzed."
					/>
					<PositionCard
						position="Sensor Network"
						description= "The sensor network is responsible for collecting and monitoring data from the car. This data includes power consumption, vibrations, temperatures, battery state and motor state. The data is transmitted to a ground station via the telemetry system, where it is visualized and analyzed."
					/>
					<PositionCard
						position="Embedded Software"
						description= "The embedded software is used for the circuit boards in the car that has microcontrollers. It includes a hardware abstraction level (HAL) and a bootloader, and revolves around microcontroller drivers and the CANbus."
					/>
					<PositionCard
						position="Test Bench"
						description= "The electrical test bench subgroup is responsible for the electrical components on the test bench. The test bench simulates rolling resistance and is used to test the car off-track."
					/>
				</PositionsContainer>
				<h2>Design</h2> 
				<PositionsContainer>
					<PositionCard
						position="Exterior design"
						description= "The focus on this role is externally visible parts, except the foil. This mainly consists of lights and wheels. CAD and freefrom modeling experience is beneficial."
					/>
					<PositionCard
						position="Foil"
						description= "The foil is central to the appearance of the car, and makes a large impact on how it is perceived. It has to have an elegant design that also incorporates our sponsors. Keyshot has been used in the past to create the model, but we are open to using different software."
					/>
					<PositionCard
						position="Interior"
						description= "There are a lot of components which plays a major part in the interior design of a car. It needs to incorporate aesthetics, a user friendly experience and a significant amount of technical functionality. The interior includes parts as the steering wheel, dashboard and seat, where everything needs to be put together and allow the driver to interact with the car as smoothly as possible."
					/>
					<PositionCard
						position="Steering wheel"
						description= "The steering wheel is an important part of the interaction between the driver and the car. It has to be aesthetically pleasing and functional, leaving a lot of freedom for the person in charge. Experience with freeform modeling is beneficial."
					/>
					<PositionCard
						position="Seat"
						description= "This position involved close collaboration with the mechanical team, because of the way that it interacts with the chassi. It needs to be shaped after the driver and follow the specifications given by the competition. CAD and freeform modeling experience is beneficial."
					/>
					<PositionCard
						position="Dashboard"
						description= "Again add something about functionality and user experience being the dominant factors, but leaving a lot of freedom of creativity towards the aesthetics? "
					/>
				</PositionsContainer>
				<h2>Software</h2>
				<PositionsContainer>
					<PositionCard
						position="Driving strategy"
						description= "Driving strategy aims to identify the optimal driving route that minimizes the vehicle's energy consumption. The process of identifying an optimal driving route includes finding an optimization algorithm that is able to find the most energy efficient consummation based on an arbitrary track. This also has to be visualized in a presentable way for the driver and the DNV Fuel Fighter team."
					/>
					<PositionCard
						position="Simulator"
						description= "The driving simulator is a simulator that lets the driver practice driving the car without having to bring the car to a track, which can be costly and time consuming. This is aimed at helping the driver gain experience driving efficiently. It also provides a great tool for marketing and spreading awareness. "
					/>
					<PositionCard
						position="Data visualization"
						description= "The data visualization subgroup is responsible for visualizing data from the sensor network and the driver inputs, which is received through the telemetry system. The visualization is done in an intuitive and descriptive manner, so that analyzing the performance of the car is easy."
					/>
					<PositionCard
						position="Web development"
						description= "The web developer is responsible for keeping our website functional , and developing new features  You will be learning and using languages such as JavaScript and PHP, and the React framework. "
					/>
				</PositionsContainer>
				<h2>Finance</h2>
				<PositionsContainer>
					<PositionCard
						position="Buisness relations "
						description= "As a voluntary organization we live on sponsorships and possible prize money. As resposible for business relations you will contact businesses and other organizations to find sponsors and collaborators, and maintain old relations. If you are studying economics or administration this is a great experience and practice. Our social media platforms such as Facebook, Instagram and our webpage are really important to help market the progress of DNV Fuel Fighter. Our social media responsible creates posts and stories to interact with our followers. "
					/>
				</PositionsContainer>
				<h2>Marketing</h2>
				<PositionsContainer>
					<PositionCard
						position="Group leader"
						description= "As Marketing group leader you will lead the marketing group. You will get an insight into photos and videos, 3D animation, graphical design and creating content for Social Media. You will be in close contact with the other groups to make exciting marketing content. The marketing group is also responsible for planning and conducting both our internal social events and external events like the reveal of our car. In addition to this the marketing group also works with the finance group get new sponsors, promote our sponsors and give them content. This is a position where you can come up with creative ideas and really think outside the box. A marketing leader should have good communication skills and be organized. It is required with any former experience about marketing."
					/>
					<PositionCard
						position="Graphical designer"
						description= "As the graphical designer of the team, you are responsible for the team's graphical profile. This means everything from the design of our logo to the visuals of our social media."
					/>
					<PositionCard
						position="Event Manager"
						description= "The event manager is responsible for social and public events of the team. This means booking venues, restaurants or go-kart tracks for the team."
					/>
					<PositionCard
						position="Photo and Video"
						description= "In order to share out progress and activities with our followers, we need to capture and share moments of our production on our social media. The photo and video responsible is in charge of taking pictures and videos of these moments. Are you experienced with a camera or interested in learning about photography, this position may be for you."
					/>
					<PositionCard
						position="Content Creator"
						description= "Social media platforms such as Facebook, YouTube, Instagram and our webpage are really important to help gain visability and market the progress of DNV Fuel Fighter. As a content creator you will have a lot of freedom to create what you think might help communicate our message of efficiency and sustainable development. Either through articles, videos or our social media channels."
					/>
				</PositionsContainer>
				{/*<Title>Apply</Title>*/}
				<JoinForm /> 

				{/* <a target="_blank" rel="noopener noreferrer" href="https://forms.gle/4CWazjpxWbrPAmqx5"><Button>Application form</Button></a> */}
			</Section>
			<Footer />
		</>
	)
}