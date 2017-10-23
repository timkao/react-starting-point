import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from '../store';


class Home extends Component {

	render() {
		return (
			<section id='home'>
				<div className='hero'>
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
			</section>
		)
	}
}

export default Home;
