import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { UserContext } from "../App";

const Navbar = () => {
	const { state, dispatch } = useContext(UserContext);

	return (
		<>
			<nav
				className="navbar navbar-expand-lg navbar-light bg-light  "
				style={{
					background: "linear-gradient(to right, #F9F9F9, #A6A6FFC2)",
				}}
			>
				<div className="navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav ">
						<li className="nav-item">
							<NavLink to="/" className="nav-link">
								<img
									src={logo}
									style={{ width: "30px", height: "30px" }}
									alt="logo"
								/>
							</NavLink>
						</li>
					</ul>
					<ul className="navbar-nav ml-auto">
						<li className="nav-item ">
							<NavLink to="/" className="nav-link">
								Home
							</NavLink>
						</li>

						<li className="nav-item">
							<NavLink to="/about" className="nav-link">
								About
							</NavLink>
						</li>

						<li className="nav-item">
							<NavLink to="/contact" className="nav-link">
								Contact
							</NavLink>
						</li>

						{!state ? (
							<>
								<li className="nav-item">
									<NavLink to="/signin" className="nav-link">
										SignIn
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink to="/signup" className="nav-link">
										SignUp
									</NavLink>
								</li>
							</>
						) : null}

						{state ? (
							<li className="nav-item">
								<NavLink to="/logout" className="nav-link">
									Logout
								</NavLink>
							</li>
						) : null}
					</ul>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
