import React, { useState, useEffect } from "react";
import "./css/signup.css";
import Navbar from "./Navbar";
import axios from "axios";
const Contact = () => {
	const [data, setData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [load, setLoad] = useState(false);

	const callContactData = async () => {
		try {
			const response = await axios.get("/getUserData", {
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.log(response);
			setData({
				name: response.data.name,
				email: response.data.email,
				phone: response.data.phone,
			});
			if (!response.status === 200) {
				throw new Error(response.error);
			}
		} catch (error) {
			console.log("error in calling About data ", error);
		}
	};
	useEffect(() => {
		callContactData();
	}, []);

	const setContactData = (e) => {
		let name = e.target.name;
		let value = e.target.value;

		setData({ ...data, [name]: value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios
			.post(
				"/contact",
				JSON.stringify({
					name: data.name,
					email: data.email,
					message: data.message,
				}),
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((res) => {
				alert('successfully submitted')
				setLoad(false);
			})
			.catch((err) => {
				alert('login failed')
				console.log("Login failed ", err);
				setLoad(false);
				setData({ ...data, 'message': '' });
			});
	};

	return (
		<div>
			<div>
				<Navbar />

				<div className="container mt-10">
					<div className="row">
						<div className="col-lg-10 col-xl-9 mx-auto">
							<div className="card card-contact flex-row my-5">
								<div className="card-body">
									<p className="card-text">Email </p>
									<p className="card-text">{data.email}</p>
								</div>
								<div className="card-body">
									<p className="card-text">Phone </p>
									<p className="card-text">{data.phone}</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="container mt-1">
					<div className="row">
						<div className="col-lg-10 col-xl-9 mx-auto">
							<div className="card card-contact flex-row ">
								<div className="card-img-left d-none d-md-flex"></div>
								<div className="card-body">
									<h5 className="card-title text-center">
										Contact Us
									</h5>
									<form className="form-signin">
										<div className="form-label-group">
											<input
												type="text"
												id="inputName"
												name="name"
												autoComplete="off"
												className="form-control"
												value={data.name}
												required
											/>
											<label htmlFor="inputName">
												Name
											</label>
										</div>
										<div className="form-label-group">
											<input
												type="email"
												name="email"
												id="inputEmail"
												value={data.email}
												className="form-control"
												required
											/>
											<label htmlFor="inputEmail">
												Email address
											</label>
										</div>

										<div className="form-label-group">
											<textarea
												className="form-control"
												id="inputText"
												rows="3"
												name="message"
												onChange={setContactData}
												placeholder="Message"
												required
											></textarea>
										</div>

										<button
											className="btn btn-lg btn-primary btn-block text-uppercase mt-3"
											type="submit"
											onClick={handleSubmit}
										>
											Submit
										</button>
										<br />
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
