const Book = require("../models/book");
const Stack = require("../models/stack");

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

		// if(req.body.author) {
		//     // req.body.author = req.body.author.trim().split(/\s*,\s*/);
		// }

		await Book.create(req.body);

		res.redirect("/books");
	} catch (error) {
		console.log(error);
		res.render("error", { title: "Something Went Wrong" });
	}
}

async function index(req, res) {
	try {
		const allBooks = await Book.find({});

		res.render("books/index", {
			books: allBooks,
			title: "All Books",
		});
	} catch (error) {
		console.log(error);
		res.render("error", { title: "Something Went Wrong" });
	}
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

async function addToStack(req, res) {
	const stack = await Stack.findById(req.params.id);
	stack.books.push(req.body.bookId);
	await stack.save();
	res.redirect(`/stacks/${stack._id}`);
}

module.exports = {
	new: newBook,
	create,
	index,
	show,
    addToStack,
};
