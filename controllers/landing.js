function home(req, res) {
	//render landing page, where user can begin login process
	res.render("landing", { title: "Stacks" });
}

module.exports = {
	home,
};
