import React from 'react';
import styled, { keyframes } from 'styled-components';

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

const Title = styled.div`
	font-family: 'Open Sans', sans-serif;
	position: absolute;
	font-weight: normal;
	font-size: 72px;
	color: white;
	opacity: 0;

	animation-name: ${titleKeyFrames};
	animation-duration: .3s;
	animation-timing-function: ease-out;
	animation-delay: .3s;
	animation-iteration-count: 1;
	animation-direction: normal;
	animation-fill-mode: forwards;
	animation-play-state: running;
`;

const CenterContent = styled.div`
	height: ${props => props.height};
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const BackgroundImage = styled.div`
	background-image: url('${props => props.url}');
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	background-color: black;
	width: 100%;
	height: 100%;
	z-index: -1;
`;

const BackgroundOverlay = styled.div`
	position: absolute;
	background-color: rgba(0,0,0,0.4);
	width: 100%;
	height: ${props => props.height};
	z-index: -1;
`;

const defaultHeight = 500;

export default function PageBanner({ height, image, title }) {
		var finalHeight = (height || defaultHeight) + 'px';
		return (
			<CenterContent height={finalHeight}>
				<BackgroundImage url={image} />
				<BackgroundOverlay height={finalHeight} />
				<Title>{title}</Title>
			</CenterContent>
		)
}