const User = require('../dataBaseModels/userRegister')

const user = {
    registerUser(req, res) {
        res.render('register')
    },

    doRegister(req, res) {
        User.create(req.body, (err, user) => {
            if(err) {
                return res.redirect('/auth/register')
            }
            res.redirect('/')
        })
    }
}

module.exports = user