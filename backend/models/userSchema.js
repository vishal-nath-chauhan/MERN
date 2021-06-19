const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
		required: true,
	},
	work: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	cpassword: {
		type: String,
		required: true,
	},
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
	date: {
		type: Date,
		default: Date.now(),
	},
	messages: [
		{
			message: {
				name: {
					type: String,
					require: true,
				},
				email: {
					type: String,
					require: true,
				},
				text: {
					type: String,
					require: true,
				},
			},
		}
	],
});

userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		console.log("inside game");
		this.password = await bcrypt.hash(this.password, 14);
		this.cpassword = await bcrypt.hash(this.cpassword, 14);
		console.log("new password ", this.password, this.cpassword);
	}
	next();
});

userSchema.methods.generateAuthToken = async function () {
	try {
		let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
		this.tokens = this.tokens.concat({ token: token });
		await this.save();
		return token;
	} catch (err) {
		console.log("Error in generateAuthToken ", err);
	}
};

userSchema.methods.addMessage = async function (name, email, message) {
	try {
		let dt={ name:name, email:email, text:message };
		this.messages = this.messages.concat({message:dt});
		await this.save();
		return this.messages;
	} catch (error) {
		console.log("error in addMessage ", error);
	}
};

const USER = mongoose.model("USER", userSchema);
module.exports = USER;
