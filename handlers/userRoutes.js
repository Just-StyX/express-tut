const User = require('../dataBaseModels/userRegister')
const bcrypt = require('bcrypt')

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
    },

    userLogin(req, res) {
        res.render('login')
    },

    doLogin(req, res) {
        const { username, password } = req.body
        User.findOne({ username }, (err, user) => {
            if(user) {
                bcrypt.compare(password, user.password, (errore, same) => {
                    if(same) {
                        req.session.userId = user._id
                        res.redirect('/')
                    } else {
                        res.redirect('/auth/login')
                    }
                })
            } else {
                res.redirect('/auth/login')
            }
        })
    }, 

    userLogout(req, res) {
        req.session.destroy(() => {
            res.redirect('/')
        })
    }
}

module.exports = user