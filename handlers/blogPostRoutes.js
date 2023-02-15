const path = require('path')
const BlogPost = require('../dataBaseModels/blogPost')

const post = {
    async homePage(req, res) {
        const blogposts = await BlogPost.find({})
        // console.log(req.session)
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

    async postPage(req, res) {
        const blogpost = await BlogPost.findById(req.params.id)
            res.render('post', {
            blogpost
        })
    },

    createPost(req, res) {
        if(req.session.userId) {
           return res.render('create')
        }
        res.redirect('/auth/login')
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

module.exports = post