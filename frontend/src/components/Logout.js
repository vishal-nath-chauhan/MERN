import React, { useEffect,useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {UserContext} from '../App'

const Logout = () => {
	const history=useHistory()
const {state,dispatch} = useContext(UserContext)

	const callAboutData = async () => {
		try {
			const response = await axios.get("/logout", {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				credentials: "include",
			});
			history.push('/signin')
        dispatch({payload:false,type:'USER'})

			if (!response.status === 200) {
				throw new Error(response.error);
			}
		} catch (error) {
			console.log("error in calling logout", error);
			window.location.replace("/signin");
		}
	};
	useEffect(() => {
		callAboutData();
	}, []);

	return <></>;
};

export default Logout;
