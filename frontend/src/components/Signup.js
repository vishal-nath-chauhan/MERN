import React, { useState } from "react";
import "./css/signup.css";
import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";
import Loader from "react-loader-spinner";

const Signup = () => {
	const [user, setUser] = useState({
		name: "",
		email: "",
		work: "",
		phone: "",
		password: "",
		cpassword: "",
	});
	let name, value;
	const [load, setLoad] = useState(false);

	const setData = (e) => {
		name = e.target.name;
		value = e.target.value;
		setUser({ ...user, [name]: value });
		console.log(user);
	};

	const postData = async (e) => {
		e.preventDefault();
		setLoad(true);
		console.log("post data called");
		const { name, email, work, phone, password, cpassword } = user;
		const resp = await fetch("/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				email,
				phone,
				work,
				password,
				cpassword,
			}),
		});

		const res = await resp.json();
		if (res.status === 422 || !res) {
			alert("Invalid Registeration");
			setLoad(false);
		} else {
			// alert("Registeration Successful");
			setLoad(false);
		}
	};
	return (
		<div>
			<Navbar />

			{load ? (
				<Loader
					type="Puff"
					color="#00BFFF"
					height={500}
					width={500}
					style={{ marginTop: "100px" }}
								/>
			) : (
				<div className="container">
					<div className="row">
						<div className="col-lg-10 col-xl-9 mx-auto">
							<div className="card card-signup flex-row my-3">
								<div className="card-img-left d-none d-md-flex"></div>
								<div className="card-body">
									<h5 className="card-title text-center">
										Register
									</h5>
									<form className="form-signin">
										<div className="form-label-group">
											<input
												type="text"
												name="name"
												value={user.name}
												className="form-control"
												required
												autofocus
												onChange={setData}
											/>
											<label htmlFor="inputUserame">
												Username
											</label>
										</div>

										<div className="form-label-group">
											<input
												type="email"
												name="email"
												className="form-control"
												value={user.email}
												onChange={setData}
												required
											/>
											<label htmlFor="inputEmail">
												Email address
											</label>
										</div>

										<div className="form-label-group">
											<input
												type="text"
												name="work"
												className="form-control"
												value={user.work}
												onChange={setData}
												required
											/>
											<label htmlFor="inputWork">
												Profession
											</label>
										</div>

										<div className="form-label-group">
											<input
												type="text"
												name="phone"
												className="form-control"
												value={user.phone}
												onChange={setData}
												autoComplete="off"
												required
											/>
											<label htmlFor="inputPhone">
												Phone Number
											</label>
										</div>

										<hr />

										<div className="form-label-group">
											<input
												type="password"
												name="password"
												autoComplete="off"
												value={user.password}
												onChange={setData}
												className="form-control"
												required
											/>
											<label htmlFor="inputPassword">
												Password
											</label>
										</div>

										<div className="form-label-group">
											<input
												type="password"
												name="cpassword"
												autoComplete="off"
												value={user.cpassword}
												onChange={setData}
												className="form-control"
												required
											/>
											<label htmlFor="inputConfirmPassword">
												Confirm password
											</label>
										</div>

										<button
											className="btn btn-lg btn-primary btn-block text-uppercase"
											type="submit"
											onClick={postData}
										>
											Register
										</button>
										<br />

										<label>
											Already have an Account?{" "}
											<NavLink to="/signin">
												Sign In
											</NavLink>
										</label>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			<br />
		</div>
	);
};

export default Signup;
