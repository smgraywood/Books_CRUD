const Stack = require("../models/stack");
const Book = require("../models/book");
const User = require("../models/user");

//renders page to add a stack
async function newStack(req, res) {
	//find current user
	const user = await User.findById(req.user._id);
	//save length of user's stacks array to a variable
	const numStacks = user.stacks.length;

	//if a user has under five stacks
	if (numStacks < 5) {
		//render page to create a new stack
		res.render("stacks/new", { title: "Enter a New Stack" });
	} else {
		//render an error page
		res.render("addStacksError", { title: "Something Went Wrong" });
	}
}

//adds stacks to MongoDB & current user
async function create(req, res) {
	try {
		//create new stack via Mongoose
		const newStack = await Stack.create(req.body);
		//find current user
		const user = await User.findById(req.user._id);
		//add new stack to current user
		user.stacks.push(newStack._id);
		//save user via Mongoose
		await user.save();
		//render all stacks page
		res.redirect("/stacks");
	} catch (error) {
		//display error on server side console
		console.log(error);
		//render error page for user
		res.render("error", { title: "Something Went Wrong" });
	}
}

async function index(req, res) {
	try {
		//find current user
		const user = await User.findById(req.user._id);
		//find stacks of the current user
		const stacks = await Stack.find({ _id: { $in: user.stacks } });

		//render stacks index page, passing in stacks of the current user
		res.render("stacks/index", { stacks: stacks, title: "All Stacks" });
	} catch (error) {
		//display error on server side console
		console.log(error);
		//render error page for user
		res.render("error", { title: "Something Went Wrong" });
	}
}

async function show(req, res) {
	try {
		//find current user
		const user = await User.findById(req.user._id);
		//find stack that will be displayed
		const foundStack = await Stack.findById(req.params.id).populate("books");
		// books will be filtered to only show those which are in the user's books
		// and are not already in stack
		const books = await Book.find({
			_id: { $nin: foundStack.books, $in: user.books },
		}).sort("title");
		//render stack's show page, passing in the found stack & books which are not already in stack
		res.render("stacks/show", {
			stack: foundStack,
			title: "See Stack Details",
			books: books,
		});
	} catch (error) {
		//display error on server side console
		console.log(error);
		//render error page for user
		res.render("error", { title: "Something Went Wrong" });
	}
}

async function addToStack(req, res) {
	//find current stack
	const stack = await Stack.findById(req.params.id);
	//add book to stack
	stack.books.push(req.body.bookId);
	//save stack via Mongoose
	await stack.save();
	//render stack's show page
	res.redirect(`/stacks/${stack._id}`);
}

async function deleteStack(req, res) {
	//delete stack from MongoDB
	await Stack.deleteOne({ _id: req.params.id });
	//find current user
	const user = await User.findById(req.user._id);
	//find index of stack that has been deleted
	const idx = user.stacks.findIndex((stack) => stack === req.params.id);
	//create a new stack to hold all stacks, except the one that has been deleted
	//splice could not be used as it overwrites the array & changed the array items object types
	const newStacks = [];
	//iterate over user's current stack array
	for (let i = 0; i < user.stacks.length; i++) {
		//if the current element's index does not equal the index that needs to be deleted
		if (i !== idx) {
			//add current element to new stacks array
			newStacks.push(user.stacks[i]);
		}
	}
	//change user's stack to the new stacks array
	user.stacks = newStacks;
	//save user via Mongoose
	await user.save();
	//render stacks index page
	res.redirect("/stacks");
}

//deletes book from a stack
async function deleteBook(req, res) {
	//find current stack
	const stack = await Stack.findById(req.params.id);
	//find index of book that will be deleted
	const idx = stack.books.findIndex((book) => book === req.params.bookId);
	//remove book from stack's book array
	stack.books.splice(idx, 1);
	//save stack via Mongoose
	await stack.save();
	//render current stack's show page
	res.redirect(`/stacks/${stack._id}`);
}

async function editStack(req, res) {
	//find current stack
	const stack = await Stack.findById(req.params.id);
	//render an edit page for the current stack
	res.render("stacks/edit", { title: "Edit Stack Name", stack });
}

async function updateStack(req, res) {
	//find current stack
	const stack = await Stack.findById(req.params.id);
	//update stack
	stack.name = req.body.name;
	//save stack via Mongoose
	await stack.save();
	//render current stack's show page
	res.redirect(`/stacks/${stack._id}`);
}

module.exports = {
	new: newStack,
	create,
	index,
	show,
	addToStack,
	delete: deleteStack,
	deleteBook,
	edit: editStack,
	updateStack,
};
