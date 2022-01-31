import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import arrowDownIcon from '../assets/icon/baseline_keyboard_arrow_down_white_48dp.png';

const ButtonBorder = styled.div`
	display: inline-block;
	padding: 5px 10px;
	border: 3px solid #AFD6AE;
	color: #AFD6AE;
	// box-shadow: inset 0 0 0 3px #AFD6AE;
	cursor: pointer;
	transition: all ease-out .1s;

	:hover {
		background-color: #AFD6AE;
		color: white;
		// box-shadow: inset 0 0 0 10px #AFD6AE;
	}
`;

function ViewMoreArrow(props) {

	const animatedViewMoreArrow = keyframes`
		80% {
			transform: translateY(0px)
		}
		90% {
			transform: translateY(10px)
		}
		100% {
			transform: translateY(0px)
		}
	`;

	const Arrow = styled.div`
		background: url('${arrowDownIcon}') no-repeat center;
		background-size: contain;
		width: 30px;
		height: 30px;
		cursor: pointer;
		
		animation: ${animatedViewMoreArrow} 3s infinite;
	`;

	const scrollDown = (_) => {
		window.scrollTo({ top: window.innerHeight - 60, behavior: 'smooth' });
	}

	return <Arrow {...props} onClick={scrollDown} />
}

function PopupMessage({time, message, onRemove}) {
	const [visible, setVisible] = useState(true);
	const PopupCard = styled.div`
		position: absolute;
		display: inline-block;
		background-color: #f5f5f5;
		vertical-align: top;
		border-radius: 3px;
		padding: 5px;
		margin-top: 30px;
		overflow: hidden;
		max-width: 90vw;
		cursor: pointer;
		color: black;
		// font-weight: bold;
		// box-shadow: 0px 6px 12px 0px rgba(0,0,0,0.05);
	`;

	useEffect(() => {
		setTimeout(() => {
			setVisible(false);
			onRemove();
		}, time)
	}, [onRemove, time]);

	return (
		<>
			{visible ? (<PopupCard>{message}</PopupCard>) : ''}
		</>
	)
}

export { ButtonBorder, ViewMoreArrow, PopupMessage }