const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Authenticate = require("../middleware/Authenticate");
router.get("/", (req, res) => {
	res.send("Router running");
});

// router.post("/register", (req, res) => {
// 	const { name, email, work, phone, password, cpassword } = req.body;

// 	if (!name || !email || !work || !phone || !password || !cpassword) {
// 		return res.status(422).json({ error: "Please fill the data" });
// 	}

// 	User.findOne({ email: email })
// 		.then((resp) => {
// 			if (resp) {
// 				return res.status(422).json({ error: "Email already exist" });
// 			}

// 			const user = new User({
// 				name,
// 				email,
// 				phone,
// 				work,
// 				password,
// 				cpassword,
// 			});
// 			user.save()
// 				.then(() => {
// 					res.status(200).json({
// 						message: "Successfully registered",
// 					});
// 				})
// 				.catch((err) => {
// 					res.status(400).json({
// 						message: "Error generated while registration ",
// 						error: err,
// 					});
// 				});
// 		})
// 		.catch((err) => {
// 			res.status(500).json({ message: "Database error" });
// 		});
// });

router.post("/register", async (req, res) => {
	const { name, email, work, phone, password, cpassword } = req.body;

	if (!name || !email || !work || !phone || !password || !cpassword) {
		return res.status(422).json({ error: "Please fill the data" });
	}

	try {
		const userExist = await User.findOne({ email: email });

		if (userExist) {
			return res.status(422).json({ error: "Email already exist" });
		}
		if (password !== cpassword) {
			return res.status(422).json({ error: "Password doesn't match" });
		}

		const user = new User({
			name,
			email,
			phone,
			work,
			password,
			cpassword,
		});

		const userRegistered = await user.save();
		res.status(200).json({
			message: "Successfully registered",
		});
	} catch (err) {
		res.status(500).json({
			message: "Something wrong happened during registration",
		});
	}
});

router.post("/signin", async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(422).json({ error: "Please fill the data" });
	}

	try {
		const userExist = await User.findOne({ email: email });
		const isMatch = await bcrypt.compare(
			String(password),
			userExist.password
		);

		const token = await userExist.generateAuthToken();
		console.log("token ", token);
		res.cookie("jwttoken", token, {
			expires: new Date(Date.now() + 25892000000),
			httpOnly: true,
		});

		if (isMatch) {
			return res.status(200).json({ message: "SigIn Done" });
		} else {
			return res.status(400).json({ error: "SignIn Failed " });
		}
	} catch (err) {
		console.log("Error while login ", err);
	}
});

router.get("/about", Authenticate, (req, res) => {
	res.send(req.rootUser);
});
router.get("/getUserData", Authenticate, (req, res) => {
	res.send(req.rootUser);
});

router.post("/contact", Authenticate, async (req, res) => {
	try {
		const { name, email, message } = req.body;
		if (!name || !email || !message) {
			return res.status(422).json({ error: "Please fill the data" });
		}
		const userExist = await User.findOne({ email: email, _id: req.userId });

		if (userExist) {
			const userMessage = await userExist.addMessage(
				name,
				email,
				message
			);
			await userExist.save();
			res.status(201).json({ message: "User contacted successfully" });
		}
	} catch (err) {
		console.log("error in contact ", err);
	}
});

router.post("/logout", (req, res) => {
	try {
		res.clearCookies("jwttoken", { path: "/" });
		res.status(200).send("User Logout");
	} catch (err) {
		console.log("error in contact ", err);
	}
});

module.exports = router;
