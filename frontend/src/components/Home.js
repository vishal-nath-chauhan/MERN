import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
const Home = () => {
	const [name, setName] = useState("");

	const callUserData = async () => {
		try {
			const response = await axios.get("/getUserData", {
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.log(response);
			setName(response.data.name);
			if (!response.status === 200) {
				throw new Error(response.error);
			}
		} catch (error) {
			console.log("error in calling User  data ", error);
		}
	};
	useEffect(() => {
		callUserData();
	});

	return (
		<div style={{ color: "white" }}>
			<Navbar />
			<h2>Welcome to AquaX.</h2>
			{name ? (
				<div>
					<h2>Welcome {name}</h2>
					<p>Happy to see you back</p>
				</div>
			) : null}
		</div>
	);
};

export default Home;
