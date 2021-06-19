import React from "react";
import "./css/notfound.css";
import Navbar from "./Navbar";
import {NavLink} from 'react-router-dom';

const NotFound = () => {
	return (
		<div>
			<Navbar />
			<section class="page_404">
				<div class="container">
					<div class="row">
						<div class="col-sm-12 mx-auto">
							<div class="col-sm-10 col-sm-offset-1  mx-auto text-center">
							<div style={{fontSize: "30px"}}>
							<h1 class="text-center ">404</h1>
										<h3 class="h2">Look like you're lost</h3>

									<p>
										the page you are looking for not
										avaible!
									</p>

									<NavLink to="/" class="link_404">
										Go to Home
									</NavLink>
									</div>
								<div class="four_zero_four_bg">
									
								</div>

							
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default NotFound;
