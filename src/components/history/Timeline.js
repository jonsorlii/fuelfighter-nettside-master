import React, { Component } from 'react';
import styled from 'styled-components';

const TimelineModule = styled.div`
  position: fixed;
  height: calc(100vh - 160px);
  width: 100px;
  top: 80px;
  left: 5%;
  -webkit-mask-image: linear-gradient(rgba(0,0,0,0), black, rgba(0,0,0,0));
`;

const TimelineScroll = styled.div.attrs(props => ({
  style: {
    marginTop: -props.offset
  }
}))``;

const Spacer = styled.div`
  height: calc(50vh - 80px);
  width: 100%;
`;

const Line = styled.div`
  width: 2px;
  height: 100px;
  background-color: rgba(255,255,255,0.3);
  margin-left: 9px;
`;

const TimelineBall = styled.div`
  background-color: rgba(255,255,255,1);
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

const TimelineYearWrapper = styled.div`
  position: absolute;
  margin-left: 30px;
`;

const TimelineYear = styled.div`
  color: white;
  font-size: 18px;
`;

const TimelineYearUnderline = styled.div`
  margin-top: 5px;
  display:block;
  content: '';
  border-bottom: solid 2px #AFD6AE;  
  transform: scaleX(0);  
  transition: transform 0.2s ease-in-out;
`;

const years = [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008];
const yearHeight = 120;

export default class Timeline extends Component {

  constructor() {
    super();
    this.state = { offset: 0, positionRatio: 0 }
    this.scrollTop = 0;
  }

  componentDidMount() {
    this.updateTimeline();
    window.addEventListener('resize', this.updateTimeline.bind(this));
    window.addEventListener('scroll', this.updateTimeline.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateTimeline.bind(this));
    window.removeEventListener('scroll', this.updateTimeline.bind(this));
  }

  updateTimeline(e) {
    var viewportHeight = window.innerHeight;
    if (e !== undefined && e.target !== undefined && e.target.scrollingElement !== undefined) {
      this.scrollTop = e.target.scrollingElement.scrollTop;
    }
    var offset = this.scrollTop / viewportHeight * yearHeight;
    var positionRatio = (this.state.offset + (yearHeight / 2)) / yearHeight;
    this.setState({ offset: offset, positionRatio: positionRatio })
  }

  render() {
    return (
      <TimelineModule>
        <TimelineScroll offset={this.state.offset}>
        <Spacer />
        <TimelineBall />
        {years.map((value, index) => {
          var active = false;
          if (this.state.positionRatio > index + 1 && this.state.positionRatio < index + 2) {
            active = true;
          }
          return (
            <div key={value}>
            <Line />
            <TimelineYearWrapper>
              <TimelineYear>{value}</TimelineYear><TimelineYearUnderline style={active ? {transform: 'scaleX(1)'} : {}} />
            </TimelineYearWrapper>
            <TimelineBall />
          </div>
          )
        })}
        </TimelineScroll>
      </TimelineModule>
    )
  }
}