import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from '../store';
var FontAwesome = require('react-fontawesome');


class Home extends Component {
	constructor(props){
		super(props);
		this.state = {
			currentSlide : '1'
		}
		this.dotClick = this.dotClick.bind(this);
		this.arrowClick = this.arrowClick.bind(this);
		this.startTimer = this.startTimer.bind(this);
	}
	dotClick(e){
		this.setState({
			currentSlide: e.target.dataset.value
		})
	}
	startTimer(){
		window.setInterval(()=>{
			if(this.state.currentSlide === '3'){
				this.setState({
					currentSlide: '1'
				})
			}
			else {
				this.setState({
					currentSlide: ((this.state.currentSlide*1)+1).toString()
				})
			}
		}, 6500)
	}
	componentDidMount(){
		this.startTimer();
	}
	arrowClick(e){
 		if(e.target.className.indexOf('left') > 0){
			if(this.state.currentSlide === '1'){
				this.setState({
					currentSlide: '3'
				})
			}
			else {
				this.setState({
					currentSlide: ((this.state.currentSlide*1)-1).toString()
				})
			}
		}
		else {
			if(this.state.currentSlide === '3'){
				this.setState({
					currentSlide: '1'
				})
			}
			else {
				this.setState({
					currentSlide: ((this.state.currentSlide*1)+1).toString()
				})
			}
		}
	}
	render() {
		const {currentSlide} = this.state;
		return (
			<section id='home'>
				<div className={'hero slide1 ' + (currentSlide === '1' ? 'activeSlide' : '')}>
					<div className='wrapper'>
						<div className='heroContent'>
							<div className='heroCopy'>
								<h2>Fall Kicks, Can't Resist</h2>
								<h4>With an unnmatched style, fall for the hottest men's sneakers of the season at TBMJ.</h4>
								<div className='cta'>
									<Link to="/categories/Men">Shop Men</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={'hero slide2 ' + (currentSlide === '2' ? 'activeSlide' : '')}>
					<div className='wrapper'>
						<div className='heroContent'>
							<div className='heroCopy'>
								<h2>Fall Kicks, Can't Resist</h2>
								<h4>With an unnmatched style, fall for the hottest women's sneakers of the season at TBMJ.</h4>
								<div className='cta'>
									<Link to="/categories/Women">Shop Women</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={'hero slide3 ' + (currentSlide === '3' ? 'activeSlide' : '')}>
					<div className='wrapper'>
						<div className='heroContent'>
							<div className='heroCopy'>
								<h2>Fall Kicks, Can't Resist</h2>
								<h4>With an unnmatched style, fall for the hottest kids's sneakers of the season at TBMJ.</h4>
								<div className='cta'>
									<Link to="/categories/Kids">Shop Kids</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='arrowRow'>
				  <div className='leftArrow arrow'>
				  <FontAwesome
				    onClick={this.arrowClick}
					name='chevron-left'
					size='3x'
					style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
					/>
				  </div>
				  <div className='rightArrow arrow'>
				  <FontAwesome
				  onClick={this.arrowClick}
				  name='chevron-right'
				  size='3x'
				  style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
				  /></div>
				</div>
				<div className='clear'></div>
				<div className='dotsRow'>
					<div onClick={this.dotClick} className={'dot ' + (currentSlide === '1' ? 'activeDot' : '')} data-value='1'></div>
					<div onClick={this.dotClick} className={'dot ' + (currentSlide === '2' ? 'activeDot' : '')} data-value='2'></div>
					<div onClick={this.dotClick} className={'dot ' + (currentSlide === '3' ? 'activeDot' : '')} data-value='3'></div>
				</div>
			</section>
		)
	}
}

export default Home;
