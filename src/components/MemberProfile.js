import React, {useState} from 'react';
import styled from 'styled-components';
import { SocialIcon } from 'react-social-icons';
import SocialMediaBar from './SocialMediaBar.js'
import defaultImage from '../assets/icon/worker_small.png';



const Card = styled.div`
	background-color: #fafafa;
	border: 1px solid rgba(0,0,0,0.1);
	vertical-align: top;
	border-radius: 7px;
	padding: 20px;
	margin: 10px;
	position: relative;
	display: inline-block;
	// box-shadow: 0px 6px 12px 0px rgba(0,0,0,0.05);
	// box-shadow: inset 0 0 0 1px rgba(255,255,255,.05),inset 0 1px 0 0 rgba(255,255,255,.2),inset 0 -1px 0 0 rgba(255,255,255,.1),0 1px 3px rgba(0,0,0,.05),0 1px 2px rgba(0,0,0,.1);
	overflow: hidden;
	padding: 0; 
	font-family: 'Muli', sans-serif;
	width: 218px;
	text-align: center;
`;

const Image = styled.div`
	background-image: url('${props => props.image || defaultImage}');
	text-align:center
	background-size: cover;
	background-position: center;
  	width: 100%;
	height: 250px;
`;

const Content = styled.div`
	padding: 15px;
`;

const Name = styled.div`
	color: black;
	font-weight: bold;
	font-size: 16px;
`;

const Studie = styled.div`
	color: rgba(0,0,0,0.7);
	font-weight: normal;
	font-size: 12px;
`;

const Mail = styled.div`
	// color: rgba(0,0,0,0.7);
	font-weight: normal;
	font-size: 12px;
	padding: 3px 0;
	color: rgba(0,0,0,0.7);
`;

const Line = styled.div`
	height: 1px;
	width: 40px;
	background-color: rgba(0,0,0,0.8);
	border-radius: 10px;
	margin: 10px auto;
`;

const Position = styled.div`
	white-space: pre-line;	
	padding: 5px 0 0 0;
	font-size: 14px;
	word-break:break-all;
	color: rgba(0,0,0,0.8);
`;


function Profile({mail, image, name, studie, position, linkedin}) {
	const [mailVisible, setMailVisible] = useState(false)

	const makeMailVisible = () => setMailVisible(true);
	const data = {'email' : mail, 'linkedin' : linkedin }
	return (
		// <AlignCenter>
			<Card>
				<Image image={image} />
				<Content>
					<Name>{name}</Name>
					{
					studie 
						? <Studie>{studie}</Studie> 
						: null
					}
					<SocialMediaBar data = {data} />
					<Line />
					<Position>{position}</Position>
				</Content>
			</Card>
		// </AlignCenter>
	)
}


/* 
	return (
		// <AlignCenter>
			<Card>
				<Image image={image} />
				<Content>
					<Name>{name}</Name>
					{
					studie 
						? <Studie>{studie}</Studie> 
						: null
					}

					{
					mail != null 
						? mailVisible 
							? <Mail>{mail}</Mail>
							: <Mail onClick={makeMailVisible} style={{color: 'blue', cursor: 'pointer'}}>View mail</Mail>
						: <Mail>&nbsp;</Mail>}
					<Line />
					<Position>{position}</Position>
				</Content>
			</Card>
		// </AlignCenter>
	)
*/


export default Profile;
