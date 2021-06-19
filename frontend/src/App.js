import "./App.css";
import About from "./components/About";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Logout from "./components/Logout";
import { Switch, Route } from "react-router-dom";
function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/" component={Home}></Route>

				<Route path="/about" component={About}></Route>
				<Route path="/signin" component={Signin}></Route>
				<Route path="/signup" component={Signup}></Route>
				<Route path="/contact" component={Contact}></Route>
				<Route path="/logout" component={Logout}></Route>

				<Route path="*" component={NotFound}></Route>
			</Switch>
		</div>
	);
}

export default App;
