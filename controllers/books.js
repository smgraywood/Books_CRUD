const Book = require("../models/book");
const Stack = require("../models/stack");
const User = require("../models/user");

function newBook(req, res) {
	res.render("books/new", {
		title: "Enter a New Book",
	});
}

async function create(req, res) {
	try {
		for (let key in req.body) {
			if (req.body[key] === "") delete req.body[key];
		}

		const newBook = await Book.create(req.body);
		const user = await User.findById(req.user._id);
		user.books.push(newBook._id);
		await user.save();

		res.redirect("/books");
	} catch (error) {
		console.log(error);
		res.render("error", { title: "Something Went Wrong" });
	}
}

async function index(req, res) {
	try {
		const user = await User.findById(req.user._id);
		const books = await Book.find({ _id: { $in: user.books } });

		res.render("books/index", {
			books,
			title: "All Books",
		});
	} catch (error) {
		console.log(error);
		res.render("error", { title: "Something Went Wrong" });
	}
}

async function editBook(req, res) {
	const book = await Book.findById(req.params.id);
	res.render("books/edit", { title: "Edit Book", book });
}

async function updateBook(req, res) {
	const book = await Book.findById(req.params.id);
	book.name = req.body.name;
	await book.save();
	res.redirect(`/books/${book._id}`);
}

async function show(req, res) {
	try {
		const foundBook = await Book.findById(req.params.id);
		res.render("books/show", {
			book: foundBook,
			title: "See Book Details",
		});
	} catch (error) {
		console.log(error);
		res.render("error", { title: "Something Went Wrong" });
	}
}

module.exports = {
	new: newBook,
	create,
	index,
	show,
	edit: editBook,
	updateBook,
};
