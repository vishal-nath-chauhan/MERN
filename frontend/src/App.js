import "./App.css";
import About from "./components/About";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Logout from "./components/Logout";
import { Switch, Route } from "react-router-dom";
import {createContext,useReducer} from 'react';
import {reducer,initialState} from './reducer/UserReducer';
export 	const UserContext=createContext();

function App() {

const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<div className="App">
		<UserContext.Provider value={{state,dispatch}}>
			<Switch>
				<Route exact path="/" component={Home}></Route>

				<Route path="/about" component={About}></Route>
				<Route path="/signin" component={Signin}></Route>
				<Route path="/signup" component={Signup}></Route>
				<Route path="/contact" component={Contact}></Route>
				<Route path="/logout" component={Logout}></Route>

				<Route path="*" component={NotFound}></Route>
			</Switch>
		</UserContext.Provider>

		</div>
	);
}

export default App;
