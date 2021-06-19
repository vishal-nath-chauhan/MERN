const mongoose = require("mongoose");
const DB_URL =process.env.DATABASE;

mongoose
	.connect(DB_URL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log("Successfully database connected ");
	})

	.catch((err) => {
		console.log("Error in database ", err);
	});