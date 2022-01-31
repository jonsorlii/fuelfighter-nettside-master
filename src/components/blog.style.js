import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { A } from 'hookrouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import Format from '../_helpers/format';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

const changeWidth = 1000;

const Title = styled.div`
  	margin: 40px 0 20px 0;
	color: #333;
	font-family: open sans,Helvetica,sans-serif;
	font-weight: 300;
	font-size: 2.3em;
`;

const TitleEdit = styled.textarea`
	width: 100%;
  margin: 40px 0;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 44px;
  color: #011A2C;

  border: none;
  
  :hover {
    background-color: #f5f5f5;
  }
`;

const Meta = styled.div`
  box-sizing: border-box;
  display: inline-block;
  width: 19%;
  vertical-align: top;
  border-left: 1px solid black;
  padding-bottom: 500em;
  margin-bottom: -500em;
  padding-left: 30px;
  padding-top: 20px;

  @media (max-width: ${changeWidth}px) {
    border-top: 1px solid black;
    border-left: none;
    width: 100%;
    padding-left: 0;
  }
`;

const MetaKey = styled.div`
	display: inline-block;
	font-size: 14px;
  color: rgba(0,0,0,0.4);
  margin-bottom: 5px;
  margin-right: 3px;
`;

const MetaValue = styled.div`
  display: inline-block;
  font-size: 14px;
	color: #3A7CA5;
`;

const Description = styled.p`
  box-sizing: border-box;
  display: inline-block;
  width: 100%;
	font-size: 20px;
  color: #0d1d44;
  font-family: 'Open Sans', sans-serif;
  line-height: 1.4;

  @media (min-width: ${1000}px) {
    width: 80%;
    padding-right: 30px;
  }
`;

const DescriptionEdit = styled.textarea`
  box-sizing: border-box;
  display: inline-block;
  width: 100%;
	font-size: 20px;
  color: #0d1d44;
  font-family: 'Open Sans', sans-serif;
  line-height: 1.4;

  @media (min-width: ${1000}px) {
    width: 80%;
    padding-right: 30px;
  }
  
  resize: vertical;
  min-height: 120px;
  border: none;

  :focus {
    outline: none;
  }

  :hover {
    background-color: #f5f5f5;
  }
`;

const FrontImage = styled.img`
  position: relative;
  display: block;
  width: 100%;
  margin: 0 auto;
  min-height: 300px;
  max-height: 500px;
  object-fit: cover;
  background-color: #f5f5f5;

  @media (min-width: ${1000}px) {
    width: 95%;
  }
`;

const Section = styled.div`
	padding: 0 5%;
`;

const DescMetaSection = styled(Section)`
  overflow: hidden;
  margin: 20px 0 40px 0;
`;

const MainSection = styled(Section)`
	width: 100%;
	margin-bottom: 200px;

  @media (min-width: ${changeWidth}px) {
    width: 80%;
  }
`;

const BackButton = styled.div`
  cursor: pointer;
  color: black;
  font-size: 1.5rem;
`;

function BlogpostCard({ id, title, description, author, date, image }) {

	const Content = styled.div`
		// background: linear-gradient(-45deg, #f2f2f2, #fafafa);
		padding: 20px;
	`;
	
	const Arrow = styled.span`
		padding-right: 5px;
		padding-left: 2px;
		transition: all 0.1s ease-in-out;
	`;

	const Link = styled(A)`
		:hover {
			opacity: 1;
		}
	`;

	const Card = styled.div`
		position: relative;
		display: inline-block;
		background-color: #f7f7f7;
		vertical-align: top;
		border-radius: 7px;
		border: 1px solid rgba(0,0,0,0.1);
		padding: 20px;
		margin: 20px;
		overflow: hidden;
		padding: 0; 
		// font-family: 'Muli', sans-serif;
		width: 350px;
		max-width: 90vw;
		cursor: pointer;
		// box-shadow: 0px 6px 12px 0px rgba(0,0,0,0.05);
		/* box-shadow: inset 0 0 0 1px rgba(255,255,255,.05),inset 0 1px 0 0 rgba(255,255,255,.2),inset 0 -1px 0 0 rgba(255,255,255,.1),0 1px 3px rgba(0,0,0,.05),0 1px 2px rgba(0,0,0,.1); */
	
		:hover {
			& ${Arrow} {
				padding-right: 0px;
				padding-left: 7px;
			}
		}

		`;

	const Image = styled.img`
		width: 100%;
		height: 250px;
		object-fit: cover;
		background-color: #f5f5f5;
	`;

	const Title = styled.div`
		font-weight: bold;
		font-size: 18px;
		color: black;
	`;

	const New = styled.div`
		color: black;
		margin-left: 10px;
		border: 2px solid #AFD6AE;
		font-weight: bold;
		font-size: 12px;
		display: inline-block;
		padding: 0 5px;
		border-radius: 3px;
		line-height: 18px;
	`;

	const DateStyle = styled.div`
		display: inline-block;
		color: rgba(0,0,0,0.4);
		font-weight: normal;
		font-size: 11px;
	`;

	const Author = styled.div`
		font-size: 12px;
		font-weight: normal;
		// color: #3A7CA5;
		color: rgba(0,0,0,0.7);
	`;

	const Description = styled.div`
		padding: 10px 0;
		font-size: 14px;
		color: rgba(0,0,0,0.6);
	`;

	const AlignRight = styled.div`
		text-align: right;
	`;


	const ReadMore = styled.div`
		font-size: 16px;
		color: #08c;
		fill: #08c;

		:hover {
			opacity: 0.9;
		}

	`;

	const [isNew, setIsNew] = useState(false);

	useEffect(() => {
		// 7 days in milliseconds
		const dayOffset = 604800000;
		var today = new Date();
		var postDate = new Date(+date);

		// if the post is less than 7 days old, show "new" label
		if (+today.getTime() < +postDate.getTime() + dayOffset) {
			setIsNew(true);
		}
	}, [date])

	const trimDescription = (str) => {
		const maxLength = 50
		const strList = (str || '').split(' ')
		return strList.length > maxLength ? strList.splice(0, maxLength).join(' ') + '...' : str || null
	}

	return (
		<Link href={`/blog/${id}`}>
			<Card>
				<Image src={image} />
				<Content>
					<DateStyle>{Format.date(date)}</DateStyle>{isNew ? <New>new</New> : <></>}
					<Title>{title || '<title>'}</Title>
					<Author>{author || 'Unknown author'}</Author>
					<Description>{trimDescription(description) || '<description>'}</Description>
					<AlignRight><ReadMore>read <Arrow><FontAwesomeIcon icon={faLongArrowAltRight} /></Arrow></ReadMore></AlignRight>
				</Content>
			</Card>
		</Link>
	)
}

const FacebookLikeWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin: 20px 0;
`;

export {
	Title, TitleEdit, Description, DescriptionEdit, FrontImage, Section, Meta, DescMetaSection, MainSection, MetaKey, MetaValue, BackButton, BlogpostCard, FacebookLikeWrapper
}