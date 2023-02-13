const user = {
    homePage(req, res) {
        res.render('index')
    },

    aboutPage(req, res) {
        res.render('about')
    },

    contactPage(req, res) {
        res.render('contact')
    },

    postPage(req, res) {
        res.render('post')
    }
}

module.exports = user