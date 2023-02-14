const BlogPost = require('../dataBaseModels/blogPost')

const customMiddleware = {
    
    validatePostForm(req, res, next){
        if(req.files === null || req.body.titles === null || req.body.subTitle === null) {
            return res.redirect('/post/new')
        }
        next();
    }
}

module.exports = customMiddleware