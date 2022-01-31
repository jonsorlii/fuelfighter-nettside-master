import React, { Component } from 'react';
import styled from 'styled-components';

const Section = styled.div.attrs(props => ({
  style: {
    opacity: props.visible ? 1.0 : 0.0,
  }
}))`
  overflow: hidden;
	width: 100%;
  height: 100vh;
  padding-top: 70px;
  opacity: 0;
  padding-left: calc(15% + 100px);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  transition: all ease-out 1s;
  box-sizing: border-box;
`;

const Content = styled.div`

`;

const Title = styled.h1.attrs(props => ({
  style: {
    transform: 'translate(0, ' + props.offset / 4 + 'px)',
  }
}))`
  color: white;
  font-size: 36px;
  // text-align: center;
  font-weight: 700;
`;

const Image = styled.img.attrs(props => ({
  style: {
    transform: 'translate(0, ' + props.offset / 3  + 'px)',
  }
}))`
  max-width: 70%;
  max-height: 60vh;
  object-fit: contain;
`;

const Text = styled.div.attrs(props => ({
  style: {
    transform: 'translate(0, ' + props.offset / 2 + 'px)',
  }
}))`
  max-width: 400px;
  color: rgba(255,255,255,0.9);
  display: inline-block;
  margin-left: -40px;
  margin-right: 20px;
  padding: 10px;
  border-radius: 3px;
  background-color: #171717;
  line-height: 24px;
  max-height: 40vh;
  overflow-y: auto;
  box-shadow: 0px 0px 82px 44px rgba(0,0,0,0.4);
`;

export default class SectionModule extends Component {

  constructor() {
    super()
    this.state = { visible: false, offset: 0 }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.calculateOffset.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.calculateOffset.bind(this));

  }

  calculateOffset(event) {
    if (!this.element) return;
    var viewportHeightHalf = window.innerHeight / 2;
    if (Math.abs(this.element.getBoundingClientRect().top) < viewportHeightHalf) {
      var offset = this.element.getBoundingClientRect().top;
      this.setState({ visible: true, offset: offset });
    } else {
      if (this.state.visible === true) {
        this.setState({ visible: false });
      }
    }
  }

  render() {
    return (
      <Section visible={this.state.visible} ref={(e) => this.element = e} >
        <Content>
          <Title offset={this.state.offset}>{this.props.title}</Title>
          <Image offset={this.state.offset} src={this.props.img} />
          <Text offset={this.state.offset}>{this.props.text}</Text>
        </Content>
      </Section>
    )
  }
}