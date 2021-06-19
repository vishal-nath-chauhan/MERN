const jwt = require("jsonwebtoken");
const user = require("../models/userSchema");

async function Authenticate(req, res, next) {
	try {
		const token = req.cookies.jwttoken;
				
			const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
		const rootUser = await user.findOne({
			_id: verifyToken._id,
			"tokens.token": token,
		});
		if (!rootUser) {
			throw new Error("User not Found");
		}
		console.log('roooooot ',rootUser)
		req.token = token;
		req.rootUser = rootUser;
		req.userId = rootUser._id;
		next();
		

		
	} catch (err) {
		res.status(401).send("Unauthorized Access : No Token Provided");
		// console.log("error in authenticate ", err);
	}
}

module.exports = Authenticate;
