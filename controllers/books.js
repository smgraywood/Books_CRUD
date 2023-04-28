const Book = require("../models/book");
const User = require("../models/user");

//renders page to add a book
function newBook(req, res) {
	res.render("books/new", {
		title: "Enter a New Book",
	});
}

//adds book to MongoDB & current user
async function create(req, res) {
	try {
		//removes empty form responses, so defaults can be applied by Mongoose
		for (let key in req.body) {
			if (req.body[key] === "") delete req.body[key];
		}

		//create new book via Mongoose
		const newBook = await Book.create(req.body);
		//find current user
		const user = await User.findById(req.user._id);
		//add newBook to current user's books
		user.books.push(newBook._id);
		//save user via Mongoose
		await user.save();
		//render all books page
		res.redirect("/books");
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
		//find books of the current user
		const books = await Book.find({ _id: { $in: user.books } });

		//render books index page, passing in books of the current user
		res.render("books/index", {
			books,
			title: "All Books",
		});
	} catch (error) {
		//display error on server side console
		console.log(error);
		//render error page for user
		res.render("error", { title: "Something Went Wrong" });
	}
}

async function editBook(req, res) {
	//find book that user wants to edit
	const book = await Book.findById(req.params.id);
	//render edit book page, passing in the book to be edited
	res.render("books/edit", { title: "Edit Book", book });
}

async function updateBook(req, res) {
	//find book that needs to be updated
	const book = await Book.findById(req.params.id);
	//apply updates to book
	book.title = req.body.title;
	book.author = req.body.author;
	book.genre = req.body.genre;
	book.rating = req.body.rating;
	book.review = req.body.review;
	book.favoriteQuote = req.body.favoriteQuote;
	//save book via Mongoose
	await book.save();
	//render updated book's show page
	res.redirect(`/books/${book._id}`);
}

async function show(req, res) {
	try {
		//find book that will be displayed
		const foundBook = await Book.findById(req.params.id);
		//render book's show page, passing in the foundBook
		res.render("books/show", {
			book: foundBook,
			title: "See Book Details",
		});
	} catch (error) {
		//display error on server side console
		console.log(error);
		//render error page for user
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
