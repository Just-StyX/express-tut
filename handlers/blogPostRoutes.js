const path = require('path')
const BlogPost = require('../dataBaseModels/blogPost')

const user = {
    async homePage(req, res) {
        const blogposts = await BlogPost.find({})
        res.render('index', {
            blogposts
        })
    },

    aboutPage(req, res) {
        res.render('about')
    },

    contactPage(req, res) {
        res.render('contact')
    },

    postPage(req, res) {
        const blogpost = BlogPost.findById(req.params.id)
            res.render('post', {
            blogpost
        })
    },

    createPost(req, res) {
        res.render('create')
    },

    postStore(req, res) {
        let image = req.files.image
        image.mv(path.resolve(__dirname, 'public/img', image.name), async (error) => {
            await BlogPost.create({
                ...req.body,
                image:'/img/' + image.name
            })
            res.redirect('/')
        })
    }
}

module.exports = user