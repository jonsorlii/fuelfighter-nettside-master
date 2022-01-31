import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { A } from "hookrouter";

// components
import Header from '../_templates/Header'
import Footer from '../_templates/Footer'
import thesisService from '../_services/thesis.service';
import PageBanner from '../components/PageBanner';

// assets
import bannerImage from '../assets/eco_marathon_flags.jpg';
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

const GroupContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-wrap: wrap;
`;

export default function Thesis() {

	const [ autonomous, setAutonomous ] = useState(false);
	const [ electrical, setElectrical ] = useState(false);
	const [ mechanical, setMechanical ] = useState(false);
	const [ other, setOther ] = useState(false);

	useEffect(() => {
		thesisService.thesises('Autonomous').then(data => setAutonomous(data));
		thesisService.thesises('Electrical').then(data => setElectrical(data));
		thesisService.thesises('Mechanical').then(data => setMechanical(data));
		thesisService.thesises('Other').then(data => setOther(data));
	}, []);

	const Text = styled.div`
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

	return (
		<>
			<Header floating/>
			<PageBanner title="Thesis" image={bannerImage} />
			<Section>
				<Text>
					Below you will find our suggestions for possible bachelor and master theses that could be written as a part of our project in the year to come. These descriptions provides a picture of some of the projects we’re working on and what we have identified as our needs in the upcoming year. But they are just propositions, so if you want to do something similar to what we have written here, or have any other ideas that you think would fit in our project, we strongly encourage you to contact us, and we’ll find a solution together.
					<br/>
					If you have questions or is interested in writing your thesis as a part of our project, please contact our project manager at leder@fuelfighter.no
				</Text>

				<Title>Autonomous</Title>
				<GroupContainer>
					{
						autonomous !== false
							? autonomous.map((thesis) => {
									return <ThesisCard
										key={thesis.id}
										id={thesis.id}
										name={thesis.title}
										description={thesis.description}
										type={thesis.type}
									/>
								})
							: ''
					}
				</GroupContainer>

				<Title>Mechanical</Title>
				<GroupContainer>
				{
						mechanical !== false
							? mechanical.map((thesis) => {
									return <ThesisCard
										key={thesis.id}
										id={thesis.id}
										name={thesis.title}
										description={thesis.description}
										type={thesis.type}
									/>
								})
							: ''
					}
				</GroupContainer>

				<Title>Electrical</Title>
				<GroupContainer>
				{
						electrical !== false
							? electrical.map((thesis) => {
									return <ThesisCard
										key={thesis.id}
										id={thesis.id}
										name={thesis.title}
										description={thesis.description}
										type={thesis.type}
									/>
								})
							: ''
					}
				</GroupContainer>

				<Title>Other</Title>
				<GroupContainer>
				{
						other !== false
							? other.map((thesis) => {
									return <ThesisCard
										key={thesis.id}
										id={thesis.id}
										name={thesis.title}
										description={thesis.description}
										type={thesis.type}
									/>
								})
							: ''
					}
				</GroupContainer>
			</Section>
			<Footer />
		</>
	)
}

function ThesisCard({ id, name, description, type, task }) {
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
		cursor: pointer;
	`;

	const Link = styled(A)`
		:hover {
			opacity: 1;
		}
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

	const Type = styled.div`
		color: rgba(0,0,0,0.4);
		font-weight: normal;
		font-size: 12px;
	`;

	const Button = styled.div`
		display: inline-block;
		color: rgba(0,0,0,1);
		box-shadow: inset 0px -3px 0px #AFD6AE;
		font-size: 14px;
		font-weight: bold;
		margin-top: 5px;
		padding: 5px;
		transition: box-shadow ease-out .3s, color .1s .2s;
		float: right;

		:hover {
			box-shadow: inset 0px -50px 0px #a5c9a5;
			color: rgba(255,255,255,1);
			transition: box-shadow ease-out .3s, color .1s;
		}
	`;

	return (
		<Link href={`/thesis/${id}`}>
			<Card>
				<Title>{name}</Title>
				<Type>{type}</Type>
				<Description dangerouslySetInnerHTML={{ __html: description }} />
				<Button>Read more</Button>
			</Card>
		</Link>
	)
}