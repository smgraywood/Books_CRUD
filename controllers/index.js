function home(req, res) {
    res.render('index', {title: "Stacks"});
}

module.exports = {
    home
};