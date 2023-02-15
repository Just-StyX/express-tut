const BlogPost = require('../dataBaseModels/blogPost')
const User = require('../dataBaseModels/userRegister')

const customMiddleware = {
    
    validatePostForm(req, res, next){
        if(req.files === null || req.body.titles === null || req.body.subTitle === null) {
            return res.redirect('/post/new')
        }

        next();
    },

    authMiddleware(req, res, next) {
        User.findById(req.session.userId, function(err, user){
            if(err || !user) {
                return res.redirect('/')
            }

            next();
        })
    },

    redirectAuthMiddleware(req, res, next) {
        if(req.session.userId) {
            return res.redirect('/')
        }

        next();
    }
}

module.exports = customMiddleware