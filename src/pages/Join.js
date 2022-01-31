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

function PositionCard({ position, description }) {
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
		selectedPositions: [],
	};

	// const positions = ["Marketing", "Mechanical", "Autonomous", "Electrical", "Design", "Group Leader"];
	// const positions = ['Project Manager', 'Assistant project manager', 'Head of Finance', 'Technical leader', 'Systems Engineer', 'Mechanical Group Leader', 'Autonomous Group Leader', 'Electrical Group Leader', 'Design Group Leader', 'Marketing Group Leader', 'Open Application']
	//const positions = ["Head of Finance", "Mechanical Group Leader", "Design Group Leader", "Marketing Group Leader", "Mechanical Member", "Design Member", "Software Member", "Autonomous Member", "Electrical Member", "Social Media", "Web Developer", "Photo and Video", "Graphical Design", "Business Relations", "Event Manager", "Open Application"];
	const positions = ["Front Suspension", "Rear Suspension", "Exterior Design", "Foil", "Steering Wheel", "Driver's Seat", "R&D - Hydrogen", "Content Creator"];
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
				<PositionsContainer>
					{/* <PositionCard
						position="Project Manager"
						description="As project manager you are the main responsible for DNV Fuel Fighter’s overall progress, and you will have the overall responsibility for ensuring the success for all phases of the team’s work, from initiation to closure. This means that you will be involved in every part of the organisation, and will have to work with both technical problems, marketing and general administration. As PM you are also our public face, and will have to talk to sponsors, organizers of the SEM-event, NTNU and many others. <br/> <br/>
						This position gives what we consider a rather unique experience in working with and managing a fairly large team and engineering project. We do not demand any previous experience in leadership, and encourage everyone interested to apply, but as the PM of a technical student organisation you should have some interest in both technical and administrative tasks. But most importantly we are looking for you who are organised, dedicated and keen to work hard to take both the car and team to the next level!"
					/>
					<PositionCard
						position="Assistant project manager"
						description="The assistant project manager(APM) works closely with the project manager(PM) to ensure that the administrative side of the project runs smoothly. The PM will have a lot to do, and you will help her/him with tasks that are ultimately their responsibility. Therefore, it is important to communicate well and work together. You will also work with the head of finance when dealing with budgeting, financing and matters of economy. In team 2022 the Assistant Project Manager will be HR responsible, meaning you will make sure the members are happy and handle possible HR situations that may arise. Some of the tasks you will have is arranging recruitment, plan employe interviews, have contact with sponsors etc. Since you will be working with the PM and share a lot of the tasks, you could be a part of deciding who is doing which tasks."
					/> */}
					{/*
					<PositionCard
						position="Head of Finance"
						description="As head of Finance, you are responsible for the budget and our sponsors. You will be in contact with employees at NTNU as well as contact people from sponsors. The work consists of purchasing orders for the team, handling sponsor deals and making sure the project is keeping within its budget. One of the tasks is also working closely with the assistant project manager in trying to get new sponsorship deals, and renewing existing ones. "
					/>
					{/* <PositionCard
						position="Technical leader"
						description="The technical leader’s most important task is to make sure that the car is ready in time for the competition. This means helping the team do their work and overcoming obstacles and making sure that the system is within the rules. You need to have a good general knowledge of each subsystem, but not necessarily every single detail. It also helps to have both experience within mechanics, electronics and software, but it is not necessary. You also have other tasks, such as reaching out to potential sponsors. "
					/> */}
				</PositionsContainer>
				{/*<hr />*/}
				<PositionsContainer>
				{/*
					<PositionCard
						position="Group Leaders"
						description="As a group leader you are responsible for planning the work of your group, helping them with what they need but also work on your own subsystem. You will get a bigger influence on the development of the organisation than a normal member and can help us reach our goals. This is a unique opportunity to be a leader in practice, and you will learn a lot!"
					/>
					<PositionCard
						position="Mechanical Group Leader"
						description="For team 2022 the mechanical team will produce our next car. This involves resin infusion of a carbon fibre monocoque, as well as modifying and improving every other aspect of the car. Examples of tasks to work on is suspension, steering, brakes or gear system. You will experience every step in the production and designing process. From designing and modelling parts and systems in CAD programs such as Fusion 360, to simulations and FEM- analysis in Hypermesh. In addition to produce every part in the workshop and composite lab."
					/>
					<PositionCard
						position="Marketing Group Leader"
						description="As Marketing group leader you will be responsible for making the DNV Fuel Fighter team visible. There is a lot of different tasks in a marketing team, like SoMe, Event planning, graphical design and photo & video, and you will be the one with an overview of what everyone is doing and help out if needed. This gives you a unique opportunity to be a part of all of these roles and learn a lot. You are also the connection between the board and every marketing role, so you need to communicate well with both and learn how to find answers to questions the group might have. This is a job where you can come up with creative ideas and really think outside the box. "
					/>
					<PositionCard
						position="Design Group Leader"
						description="As a member of the design team, you will inherit the concept we have been working on for the last year, developing it further, and eventually producing the car and completing in the 2022 Shell Eco Marathon. The design process involves physical and digital testing of aerodynamics, strength, ergonomics, and aesthetics. You will be drawing, building clay-models, and modelling in Fusion 360. You will follow the concept all the way from a CAD-file to a competitive concept car, cooperate with other skilled students from a variety of professions, and work as a team to overcome the challenges along the way. "
					/>
					{/* <PositionCard
						position="Autonomous Group Leader"
						description="As a member in the feature team Autonomous you will gain insights in how to make a car self-driving. You will work with high tech equipment as 3D Lidar, stereo camera, localization gear, components for steering and breaking the car and much more! It’s also a good experience where you can develop you coding skills, by forming algorithms to solve a task. You will not only take part in one small part of the system, but you will work together with the rest of the team trying to achieve common goals, and to get to this point all of the members need to contribute in all of the systems shaping process. The system is young, and you can by this have a lot of influence on the design."
					/>
					<PositionCard
						position="Electrical Group Leader"
						description="As leader of the electrical team, you are responsible for making sure the electrical system is ready for the competition.  You will get insight in all the electronics needed to make an electric car, this includes everything from motors to the dashboard. Improving on last years design is important to improve the efficiency of the electrical system. This includes everything from hardware design to writing software. You will also be responsible for ordering everything the team needs for electrical system. It is a great experience as you can influence the whole electrical system, and you get to help the team members when they encounter problems with their subsystems. It can be challenging at times, but it is also a lot of fun. "
					/> /*}
					{/* <PositionCard 
						position="Mechanical" 
						description="The mechanical group this year will first of all complete and improve the current car. This includes: 
							<ul>
								<li>An efficient gear system</li>
								<li>Suspension</li>
								<li>Brake system</li>
								<li>Steering</li>
								<li>Carbon fiber rims</li>
								<li>Windows and doors</li>
							</ul>
							But they will also start developing the new car for SEM2022. They will help the design/R&D team set constraints for the new monocoque based on other mechanical parts and plan and train for the production process." 
					/>
					<PositionCard 
						position="Electrical" 
						description="The electrical team will design, produce and test printed circuit boards and all the other electronics in the car to make our car as efficient as possible. Some of the electrical systems we are working on are: 
							<ul>
								<li>Motor controller</li>
								<li>Telemetry and data monitoring</li>
								<li>Power distribution and battery management system</li>
								<li>Interface (steering wheel, screens, dashboard, lights etc.)</li>
								<li>Test bench</li>
							</ul>" 
					/>
					<PositionCard 
						position="Design/ R&D" 
						description="The design/R&D team will finish some final touches on the current car. This includes: 
							<ul>
								<li>Steering wheel</li>
								<li>Dashboard</li>
								<li>Foil</li>
							</ul>
							But the most important part will be to start designing and prototyping our new car. This will include: 
							<ul>
								<li>Sketching ideas</li>
								<li>Making models to 3D scan into CAD software</li>
								<li>3D modelling (CAD)</li>
								<li>Aerodynamics simulation</li>
								<li>Topology optimization</li>
								<li>Composite optimization</li>
							</ul>
							The plan for the new monocoque is to produce it the fall of 2021." 
						/>
					<PositionCard 
						position="Marketing" 
						description="Marketing is a very important group for us. It helps us get new and keep existing sponsors as well as giving us more attention among students at NTNU. Next to the efficiency competition, winning the Marketing Award in Shell Eco Marathon is one of our main goals.
							<br />
							Positions we have in marketing: 
							<ul>
								<li>Graphical designer</li>
								<li>Web development</li>
								<li>Pictures and editing</li>
								<li>Video editing (promo video, vlog etc.)</li>
								<li>Social Media</li>
								<li>Event planning (external and internal events)</li>
							</ul>
							Even though everyone has different responsibilities, it is a group effort. You will get experience with working with a lot of different stuff.  " 
					/>
					<PositionCard 
						position="Autonomous" 
						description="One of our goals this year is to compete in the Shell Eco Marathon Autonomous competition. To do that we need a good group of motivated students. There will be a steep learning curve, but you will get valuable experience and good friends. Fields you could work on in the autonomous group is path planning, simultaneous localization and mapping (SLAM) using a 360 LiDAR, control, ultrasonic sensors and more." 
					/>
					<PositionCard 
						position="Group Leader" 
						description="Do you want to be a group leader? As a group leader you are responsible for planning the work of your group, helping them with what they need but also work on your own subsystem. You will get a bigger influence on the development of the organisations than a normal member, and can help us reach our goals.  
							<br />
							Leader positions available: 
							<ul>
								<li>Mechanical Leader</li>
								<li>Design/R&D Leader</li>
								<li>Autonomous Leader</li>
							</ul>" 
					/> */}
				</PositionsContainer>
				
				<h2>Mechanical</h2>
				
				<PositionsContainer>
					{/*
					<PositionCard 
						position="Mechanical Group" 
						description="The mechanical team spends their time thinking about new solutions and optimizing parts with FEA software and testing. In February they start the manufacturing and assembly process. With the exception of standardized parts, the team performs all of the manufacturing themselves. Partners help us with tooling and advice for the most involved parts."
					/>
					*/}
					<PositionCard 
						position="Front suspension" 
						description="The front suspension carries the majority of the weight while providing dampening. Being one of the most dangerous points of failure, the designs have to be analyzed and testet comprehensively. There has historically been a lot of freedom and change here, and this year we have a new system that has yet to be tested."
					/>
					<PositionCard 
						position="Rear suspension" 
						description="The upcoming car will use trailing-arm rear suspension, which links the wheels to the chassis as well as carrying the motors, gear system, and rear brakes. One of the main goals this year is to swap as much aluminium with carbon fiber composite as possible."
					/>
					<PositionCard 
						position="3D-printing and prototyping" 
						description="Before parts are cast to carbon fiber composite, they are prototyped by 3D printing. Your responsibilities will be performing 3D prints, assisting with testrig, and maintaining the printer. This may involve contact with other organization to lend printer access. For this position you need to be familiar be FFF/FMD printing with PLA or PETG, and slicing models. Familiarity with CAD is a plus."
					/>
					{/*
					<PositionCard 
						position="Steering" 
						description="The steering mechanism is the link between the driver and the front suspension, allowing the car to change direction. Over the history of the project, many interesting solutions have been tried in solving the challenge of making this as lightweight and precise as possible. The new chassis geometry requires a new such solution, which provides a lot of freedom in terms of design."
					/> 
					<PositionCard 
						position="Brakes" 
						description="In order to stop the car, a four-disc hydraulic brake system is required by the regulations. This must be designed to minimize any losses under driving, as well as be able to operate autonomously during the competition."
					/>
					<PositionCard 
						position="Test rig" 
						description="For the autonomous team developing the self-driving capabilities of the car, a method is needed to test their work in real life without stopping all work on the car. A test rig is therefore being built to provide the basic functionality required for autonomous driving."
					/>
				
					<PositionCard 
						position="Doors/Windows" 
						description="These provide crucial functionality for the driver in the competition. Challenges include finding effective methods to interface the doors to the chassis, building a hinge mechanism which is rigid and robust, and finding new materials and production methods to keep the weight of the windows at a minimum."
					/> 
					<PositionCard 
						position="Chassis composite optimization/analysis" 
						description="The heaviest part of the car is the monocoque, making it one of the most important parts to optimize as much as possible. This involves working with industry-leading FEA software to create the absolute lightest structure possible. It also requires testing of different fiber-matrix systems and core materials to find the best choice for each part of the car."
					/>
					<PositionCard 
						position="Aerodynamics" 
						description="Aerodynamic drag is one of the factors with the largest impact on a vehicles efficiency. Here you will be working with computational fluid dynamics in cooperation with the design group, in order to reshape the monocoque exterior to have the lowest drag coefficient possible."
					/>
					<PositionCard 
						position="Gear system" 
						description="Electric motors, much like internal combustion engines, have an efficiency dependent on its rotational speed. We therefore use a gear system to link the motors to the rear wheels, which lets the motors run closer to their optimal speed in different conditions. This is a part of the car that has undergone several extensive redesigns. New approaches, for example magnetic gearing, have the potential to take this further in terms of efficiency, weight and reliability."
					/>
					<PositionCard 
						position="Wheels" 
						description="When it comes to weight reduction, the wheels of a car is the area where it makes the biggest impact. Being rotational mass, these contribute to the inertia of the vehicle more than any other component. Being custom made of prepreg carbon fiber, our current design is far from heavy. However, through some creative redesign, they can potentially be made even lighter."
					/>		*/}			
				</PositionsContainer> 
				<h2>Research and Development - Hydrogen</h2>
				<PositionsContainer>
					<PositionCard 
						position="R&D Hydrogen" 
						description="We are looking into the transition of building our electrical car to a hydrogen one; this means we need a team specifically grouped to research about hydrogen fuel cells, all the risks of moving from electric to hydrogen and the requirements we will need to transition. "
					/>
				{/*
					<PositionCard 
						position="X" 
						description=""
					/>
					<PositionCard 
						position="Y" 
						description=""
					/>*/}	
				</PositionsContainer> 
		
				<h2>Design</h2>
				<PositionsContainer>
					{/*}
					<PositionCard 
						position="Design Group" 
						description="As a member of the design team, you will inherit the concept we have been working on for the last year, developing it further, and eventually producing the car and completing in the 2022 Shell Eco Marathon. The design process involves physical and digital testing of aerodynamics, strength, ergonomics, and aesthetics. You will be drawing, building clay-models, and modelling in Fusion 360. You will follow the concept all the way from a CAD-file to a competitive concept car, cooperate with other skilled students from a variety of professions, and work as a team to overcome the challenges along the way."
					/>
					*/}
					<PositionCard 
						position="Exterior Design" 
						description="The focus on this role is externally visible parts, except the foil. This mainly consists of lights and wheels. CAD and freefrom modeling experience is beneficial."
					/>
					<PositionCard 
						position="Foil" 
						description="The foil is central to the appearance of the car, and makes a large impact on how it is perceived. It has to have an elegant design that also incorporates our sponsors. Keyshot has been used in the past to create the model, but we are open to using different software."
					/>
					{/*
					<PositionCard 
						position="Interior" 
						description="There are a lot of components which play a major part in the interior design of a car. It needs to incorporate (1) aesthetics, (2) a user-friendly experience and (3) a significant amount of technical functionality. Responsibilities under Interior includes designing of the steering wheel, dashboard, and seat, where everything needs to be put together and that the design allows the driver to interact with the car as smoothly as possible.
										Under the Interior, we have two available positions: Steering Wheel and Driver's Seat."
					/>
					*/}
					<PositionCard 
						position="Steering Wheel" 
						description="The steering wheel is an important part of the interaction between the driver and the car. It has to be aesthetically pleasing and functional, leaving a lot of freedom for the person in charge. Experience with freeform modeling is beneficial."
					/>
					<PositionCard 
						position="Driver's Seat" 
						description="This position involved close collaboration with the mechanical team, because of the way that it interacts with the chassi. It needs to be shaped after the driver and follow the specifications given by the competition. CAD and freeform modeling experience is beneficial."
					/>
					{/*
					<PositionCard 
						position="Dashboard" 
						description="The dashboard houses the entire instrument panel of the car, used to visually monitor the ongoing processes during operation and allowing the driver to interact with the settings of the car."
					/>
					<PositionCard 
						position="Seat" 
						description="The seat of the car, being built into the chassis of this year's concept, needs to be designed in collaboration with the mechanical group members working on the monocoque. Here, aesthetics, functionality and user experience all play a large role."
					/>
					*/}
				</PositionsContainer>
				{/*
				<PositionsContainer>
					<PositionCard 
						position="Software Group" 
						description="The software team is responsible for the software developed for use off-track. Subsystems of this team include driving strategy and simulator."
					/>
					<PositionCard 
						position="Driving strategy" 
						description="Driving strategy aims to identify the optimal driving route that minimizes the vehicle's energy consumption. The process of identifying an optimal driving route includes finding an optimization algorithm that is able to find the most energy efficient consummation based on an arbitrary track. This also has to be visualized in a presentable way for the driver and the DNV fuel fighter team."
					/>
					<PositionCard 
						position="Simulator" 
						description="The driving simulator is a simulator that lets the driver practice driving the car without having to bring the car to a track, which can be costly and time consuming. This is aimed at helping the driver gain experience driving efficiently. The goal is to create something which interfaces with the test bench, allowing steering and pedal responses from the car itself to be used as inputs, making it as true to life as possible. It also provides a great tool for marketing and spreading awareness."
					/>
					<PositionCard 
						position="Data Visualization"
						description="The data visualization subgroup is responsible for visualizing data from the sensor network and the driver inputs, which is received through the telemetry system. The visualization is done in an intuitive and descriptive manner, so that analyzing the performance of the car is easy."
					/>
				</PositionsContainer>
				<hr />
				<PositionsContainer>
					<PositionCard
						position="Autonomous Group" 
						description="As a member in the feature team Autonomous you will gain insights in how to make a car self-driving. You will work with high tech equipment such as 3D Lidar, stereo camera, localization gear, components for steering and breaking the car and much more! It's also a good experience where you can develop you coding skills, by forming algorithms to solve a task. You will not only take part in one small part of the system, but you will work together with the rest of the team trying to achieve common goals, and to get to this point all members need to contribute in all of the systems shaping process. The system is young, and you can by this have a lot of influence on the design."
					/>
					<PositionCard 
						position="SLAM/Lidar" 
						description="To give the autonomous car a kind of vision for greater distances, a LiDAR (Light Detection and Ranging) is used. The main task for the team is to use the data published by the LiDAR and process it in a way so that the autonomous control-team can use it for steering, braking and acceleration of the car. SLAM is short for Simultaneous Localization and Mapping and is responsible for mapping an unknown environment, whilst keeping track of its position inside the map."
					/>
					<PositionCard 
						position="Autonomous control"
						description="The control system receives the desired steering angle and speed from the autonomous software on the onboard computer and makes it happen. It needs to be able to turn the steering wheel, engage the brakes,shut down if the driver manually brakes and be removable. It also receives the desired speed from the computer and transfers this data to the motorcontroller."
					/>
					<PositionCard 
						position="Simulator" 
						description="Making an autonomous car is not a straightforward task. It is a process of trial and error, and testing is therefore one of the most important and useful things to do. However, it is difficult and time consuming to test on the actual car. Therefore, we have implemented a simulator for the system which simulates the driving physics and sensors, making testing much easier to carry out."
					/>
					<PositionCard 
						position="Path Tracking" 
						description="In order to make an autonomous car, it is not only necessary to figure out where we want to drive, but also how to make the car drive where we want. This part is also known as path tracking. It is crucial to have a good path tracking system to make an autonomous car. Without it the car would drive off the road and crash."
					/>
					<PositionCard 
						position="Path planning and Goal Handling"
						description="Path planning has two responsibilities. The first is to make a path to the goal using the map and sensor data. The second is to compute the linear and angular velocity reference values that make the car follow the path. Responsibility of goal handling is to find a suitable goal for the car from the map generated by SLAM."
					/>
					<PositionCard 
						position="Camera" 
						description="The goal of the camera subsystem is to be capable of detecting lanes, obstacles and parking spots. This is done by using machine learning and other complex algorithms. The camera employed is a ZED 2 stereo camera. This makes us able to calculate the distance to different objects."
					/>
				</PositionsContainer>
				<hr />
				<PositionsContainer>
					<PositionCard 
						position="Electrical Group" 
						description="For the 2022 competition the team will be building a brand new car. The electrical group is in charge of making the electrical systems for the car. Building a car to run with extreme efficiency requires the electrical group to optimize the electrical systems on every level, making all systems low power with innovative solutions. As a member of the group you will plan out your system, design circuit boards in KiCad, solder your boards, and code the microcontrollers responsible for driving your system."
					/>
					<PositionCard 
						position="Motor Controller" 
						description="The motor controller drives the car's motors. It is one of the most crucial systems for making the car draw as little power as possible."
					/>
					<PositionCard 
						position="Driver Interface" 
						description="The driver interface is the system that the driver uses to interact with the car, and with the outside world through lights, horn and wipes. A series of circuit boards in the steering wheel and the dashboard handles the inputs from the buttons on the steering wheel, and communicates through the CANbus."
					/>
					<PositionCard 
						position="Battery Management System" 
						description="The BMS handles over-current and -voltage protection of the battery cells. It is the 'guard' for the battery and makes sure that nothing critical happens while the car is in use."
					/>
					<PositionCard 
						position="Power Distribution" 
						description="The power distribution system makes sure that all the different components and subsystems get the correct voltage and enough power to work properly."
					/>
					<PositionCard 
						position="Telemetry" 
						description="The telemetry is responsible for transmitting data from the driver inputs and the car's sensor network. The data is transmitted to a ground station, where it is visualized and analyzed."
					/>
					<PositionCard 
						position="Sensor Network" 
						description="The sensor network is responsible for collecting and monitoring data from the car. This data includes power consumption, vibrations, temperatures, battery state and motor state. The data is transmitted to a ground station via the telemetry system, where it is visualized and analyzed."
					/>
					<PositionCard 
						position="Embedded software" 
						description="The embedded software is used for the circuit boards in the car that has microcontrollers. It includes a hardware abstraction level (HAL) and a bootloader, and revolves around microcontroller drivers and the CANbus."
					/>
					<PositionCard 
						position="Test Bench"
						description="The electrical test bench subgroup is responsible for the electrical components on the test bench. The test bench simulates rolling resistance and is used to test the car off-track."
					/>
				</PositionsContainer>
				<hr />
				*/}
				<h2>Marketing</h2>
				<PositionsContainer>
					{/*
					<PositionCard 
						position="Marketing Group" 
						description="As a member of the marketing group you are responsible for making DNV Fuel Fighter visible to the outside. This includes creating a monthly newsletter, taking photos and videos, and updating our followers on Facebook, Instagram and LinkedIn about what we are up to. If you are interested in subjects like photography, online marketing strategies, web development or graphical design, the marketing team may be the place for you!"
					/>
					{/*
					<PositionCard 
						position="Graphical Designer"
						description="As the graphical designer of the team, you are responsible for the team's graphical profile. This means everything from the design of our logo to the visuals of our social media"
					/>
					<PositionCard 
						position="Event Manager"
						description="The event manager is responsible for social and public events of the team. This means booking venues, restaurants or go-kart tracks for the team."
					/>
					<PositionCard 
						position="Photo and Video"
						description="In order to share out progress and activities with our followers, we need to capture and share moments of our production on our social media. The photo and video responsible is in charge of taking pictures and videos of these moments. Are you experienced with a camera or interested in learning about photography, this position may be for you."
					/>
					*/}
					<PositionCard 
						position="Content Creator"
						description="Social media platforms such as Facebook, YouTube, Instagram and our webpage are really important to help gain visability and market the progress of DNV Fuel Fighter. As a content creator you will have a lot of freedom to create what you think might help communicate our message of efficiency and sustainable development. Either through articles, videos or our social media channels. "
					/>
					{/*
					<PositionCard 
						position="Web Developer"
						description="The web developer is responsible for keeping our website functional and up to date. You will be learning and using languages such as React JS and PHP."
					/>
					<PositionCard 
						position="Business Relations"
						description="As a voluntary organization we live on sponsorships and possible prize money. As resposible for business relations you will contact businesses and other organizations to find sponsors and collaborators, and maintain old relations. If you are studying economics or administration this is a great experience and practice"
						Social media platforms such as Facebook, Instagram and our webpage are really important to help market the progress of DNV Fuel Fighter. Our social media responsible creates posts and stories to interact with our followers.
					/>
					*/}
					
				</PositionsContainer>
				
				<Title>Apply</Title>
				<JoinForm />

				{/* <a target="_blank" rel="noopener noreferrer" href="https://forms.gle/4CWazjpxWbrPAmqx5"><Button>Application form</Button></a> */}
			</Section>
			<Footer />
		</>
	)
}