require('./dbConnect/dbConnect.js')
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const fileUpload = require('express-fileupload')
const postRoutes = require('./handlers/blogPostRoutes');
const userRoutes = require('./handlers/userRoutes');
const customMiddleware = require('./middlewares/middlewares');

const PORT = process.env.PORT || 3000

const app = express()
app.set('view engine', 'ejs')

// linking middlewares
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload({
    createParentPath: true,
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))
app.use(expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}))

// linking custom middlewares
app.use(customMiddleware.validatePostForm)
// app.use(customMiddleware.authMiddleware)


// global middleware
global.loggedIn = null
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId

    next()
})

// post routes
app.get('/', postRoutes.homePage)
app.get('/about', postRoutes.aboutPage)
app.get('/contact', postRoutes.contactPage)
app.get(
    '/post/new', 
    customMiddleware.validatePostForm, 
    customMiddleware.authMiddleware, 
    postRoutes.createPost
)
app.post('/post/store', customMiddleware.authMiddleware, postRoutes.postStore)
app.get('/post/:id', postRoutes.postPage)


// user routes
app.get('/auth/register', customMiddleware.redirectAuthMiddleware, userRoutes.registerUser)
app.post('/users/register', customMiddleware.redirectAuthMiddleware, userRoutes.doRegister)
app.get('/auth/login', customMiddleware.redirectAuthMiddleware, userRoutes.userLogin)
app.post('/users/login', customMiddleware.redirectAuthMiddleware, userRoutes.doLogin)
app.get('/auth/logout', userRoutes.userLogout)


// 404 page
app.use((req, res) => res.render('notfound'))


app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})