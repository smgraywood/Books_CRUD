function home(req, res) {
    res.render('landing', {title: "Stacks"});
}

module.exports = {
    home
};