import React, { useState, useEffect} from 'react';
import 'react-dropdown/style.css';
import styled from 'styled-components';

// components
import Header from '../_templates/Header'
import Footer from '../_templates/Footer'
import { Title } from '../components/blog.style';
import Profile from '../components/MemberProfile';
import PageBanner from '../components/PageBanner';
import teamSevice from '../_services/team.service';

// assets
import imageHeader from '../assets/fellesbilde_bil.jpg';

const Description = styled.div`
	width: 800px;
	margin-bottom: 50px;
	background-color: #f8f8f8;
	border-radius: 7px;
	border: 1px solid rgba(0,0,0,0.1);
	overflow: hidden;

	display: flex;

	@media (max-width: 850px) {
		flex-direction: column;
		width: 352px;
	}
`;

const Text = styled.div`
	font-size: 16px;
	opacity: 0.7;
	height: 100%;
	padding: 20px;
	vertical-align: top;
`;

const Image = styled.img`
	display: block;
	width: 350px;
	height: 300px;
	z-index: 2;
	object-fit: cover;
`;

const Section = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px 5%;
	background-color: white;
`;

const Content = styled.div`
	display: flex; 
	justify-content: center; 
	flex-wrap: wrap;
	max-width: 1400px;
	align-items: flex-start;
`;

// const TeamImage = styled.img`
// 	object-fit: cover;
// 	width: 100%;
// 	height: 100%;
// `;

// const TeamImageContainer = styled.div`
// 	overflow: hidden;
// 	max-height: 40vh;
// 	min-height: 200px;
// 	width: 100vw;
// `;

const Loading = styled.div`
	display: flex;
	justify-content: center;
	padding-top: 40px;
`;

export default function Team() {
	const TeamsWrap = styled.div`
		min-height: 1000px;
		background-color: #F6F8FC;
	`;

	const defaultYear = 2022;

	const [teams, setTeams] = useState([]);
	const [selectedYear, setSelectedYear] = useState(defaultYear);

	useEffect(() => {
		let canceled = false;
		var index = 0;
		var selected = selectedYear;

		const loop = async (index, selected) => {
			const data = await teamSevice.team(selected, index);

			if (data['exist'] === true) {
				if (canceled === true) {
					console.log(`Loaded wrong year.`);
				} else {
					delete data['exist'];
					setTeams(teams => [...teams, data]);
					index++;
					loop(index, selected);
				}
			}
		}

	

		loop(index, selected);
		console.log(teams)
		return () => {
			canceled = true
		}
		
	}, [selectedYear])

	const onSelectedYearChange = (val) => {
		setTeams([]);
		setSelectedYear(+val);
		// getTeamData(0, +val);
	}
	console.log(teams)

		return (
			<>
				<Header floating/>
				<PageBanner title="Team" image={imageHeader} />
				<div style={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px'}}>
					<select value={selectedYear.toString()} onChange={(e) => onSelectedYearChange(e.target.value)}>
						<option value={2022}>2022</option>
						<option value={2021}>2021</option>
						<option value={2020}>2020</option>
					</select>
				</div>
				<TeamsWrap>
					{teams.length !== 0 
					? teams.map(team => (
						<div key={team.name} >
							{/* {team.team_image !== null ? <TeamImageContainer><TeamImage src={team.team_image} /></TeamImageContainer> : null} */}
							<Section>
								<Title>{team.name}</Title>
								<Description>
									{/* 
									<Image src={team.preview_image}/>
									description
									*/}
									<Image src={team.preview_image}/>
									<Text>{team.description}</Text>
								</Description>
								<Content>
									{team.members.map(member => (
										<Profile key={member.firstname + ' ' + member.lastname} name={member.firstname + ' ' + member.lastname} position={member.position_description} studie={member.study} mail={member.email} image={member.image} linkedin = {member.linkedin} />
									))}
								</Content>
							</Section>
						</div>
					))
				: <Loading><div className="spinner" /></Loading>
				}
				</TeamsWrap>
				<Footer />
			</>
		)
}
