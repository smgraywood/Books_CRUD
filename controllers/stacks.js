const Stack = require("../models/stack");
const Book = require("../models/book");
const User = require("../models/user");

//renders page to add a stack
function newStack(req, res) {
	res.render("stacks/new", { title: "Enter a New Stack" });
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
		//find stack that will be displayed
		const foundStack = await Stack.findById(req.params.id).populate("books");
		// books will be filtered to only show those which are not already in stack
		const books = await Book.find({ _id: { $nin: foundStack.books } }).sort(
			"title"
		);
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
