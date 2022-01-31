import styled from 'styled-components';
import { Link } from 'react-router-dom';

// assets
import backgroundImage from '../assets/background/clouds-83cd5c734308d3f82183cf737fe13f59.jpg';

const Body = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-image: url('${backgroundImage}');
  background-attachment: fixed;
  background-size: cover;
  display: flex;
  flex-direction: column;
`;

const Username = styled.div`
  position: relative;
  width: 100%;
  padding: 30px;
  color: white;
  font-size: 1.5rem;
  text-align: center;
`;

const HelpContainer = styled.div`
  position: fixed;
  top: 12px;
  right: 12px;
  color: white;
  font-size: 24px;
`;

const BackButton = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  color: white;
  font-size: 1.5rem;
  padding: 30px;
  cursor: pointer;
`;

const Options = styled.div`
  width: 650px;
  height: auto;
  border: 3px solid white;
  border-bottom: none;
  margin-bottom: 100px;
`;

const Option = styled.div`
  width: 100%;
  font-size: 2.25rem;
  line-height: 3.32rem;
  color: white;
  padding: 2rem;
  text-decoration: none;
  cursor: pointer;
  border-bottom: 3px solid white;
  transition: all ease-in-out .1s;
  background-color: ${props => props.private === true ? 'rgba(0,0,0,0.2)' : 'transparent'};

  :not(:last-of-type) {
    border-bottom: 3px solid white;
  }

  :hover {
    background-color: white;
    color: black;
  }
`;

const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 2;
`;

const Input = styled.div`
    position: relative;
    padding-bottom: 1.25rem;
    margin-bottom: 3rem;
`;

const InputLabel = styled.label`
  position: absolute;
  bottom: 0;
  font-size: 1rem;
  color: #fff;
  line-height: 1;
`;

const InputField = styled.input`
  margin-top: .5rem;
  margin-bottom: .5rem;
  width: 100%;
  color: white;
  font-size: 1.5rem;
  order: -1;
  background-color: transparent;
  border-radius: 0;
  border-width: 0 0 2px;
  border-color: #fff;
`;

export { Option, Options, StyledLink, Content, BackButton, Username, Body, HelpContainer, Input, InputField, InputLabel }