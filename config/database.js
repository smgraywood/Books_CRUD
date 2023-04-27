const mongoose = require("mongoose");

//connect to db
mongoose.connect(process.env.DATABASE_URL);

//setup a shortcut var to the connection obj
const db = mongoose.connection;

//upon connection, console log msg on server side
db.on("connected", () => {
	console.log(`Connected to MongoDB ${db.name} at ${db.host}: ${db.port}`);
});
