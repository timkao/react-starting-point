import React from 'react'

function Footer(){
	return (
		<footer className="navbar navbar-fixed-bottom">
			<div className="container">
				<div className="row"> 
					<div className="col-md-6">
						<h5 className="title">Footer Content</h5>
						<p>Footer Description...</p>
					</div> 
					<div className="col-md-6">
						<h5 className="title">Links</h5>
						<ul>
							<li><a href="#!">Link 1</a></li>
							<li><a href="#!">Link 2</a></li>
							<li><a href="#!">Link 3</a></li>
						</ul>
					</div>
				</div>
				<div className="footer-copyright">
					<div className="container-fluid">
						&copy; 2017 Copyright: TBMJ
					</div>
				</div>
			</div> 
		</footer>
	)
}
export default Footer
