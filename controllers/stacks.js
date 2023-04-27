const Stack = require("../models/stack");
const Book = require("../models/book");

function newStack(req, res) {
	res.render("stacks/new", { title: "Enter a New Stack" });
}

async function create(req, res) {
	try {
		// delete empty fields from req.body
		await Stack.create(req.body);
		res.redirect("/stacks");
	} catch (error) {
		console.log(error);
		res.render("error", { title: "Something Went Wrong" });
	}
}

async function index(req, res) {
	try {
		const stacks = await Stack.find();
		res.render("stacks/index", { stacks: stacks, title: "All Stacks" });
	} catch (error) {
		console.log(error);
		res.render("error", { title: "Something Went Wrong" });
	}
}

async function show(req, res) {
	try {
		const foundStack = await Stack.findById(req.params.id).populate("books");
		// books will be filtered to only show those which are not already in stack
		const books = await Book.find({ _id: { $nin: foundStack.books } }).sort(
			"title"
		);
		res.render("stacks/show", {
			stack: foundStack,
			title: "See Stack Details",
			books: books,
		});
	} catch (error) {
		console.log(error);
		res.render("error", { title: "Something Went Wrong" });
	}
}

async function addToStack(req, res) {
	const stack = await Stack.findById(req.params.id);
	stack.books.push(req.body.bookId);
	await stack.save();
	res.redirect(`/stacks/${stack._id}`);
}

async function deleteStack(req, res) {
	await Stack.deleteOne({ _id: req.params.id });
	res.redirect("/stacks");
}

async function deleteBook(req, res) {
	const stack = await Stack.findById(req.params.id);
	const idx = stack.books.findIndex((book) => book === req.params.bookId);
	stack.books.splice(idx, 1);
	await stack.save();
	res.redirect(`/stacks/${stack._id}`);
}

async function editStack(req, res) {
	const stack = await Stack.findById(req.params.id);
	res.render("stacks/edit", { title: "Edit Stack Name", stack });
}

async function updateStack(req, res) {
	const stack = await Stack.findById(req.params.id);
	stack.name = req.body.name;
	await stack.save();
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
