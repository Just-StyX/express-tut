require('./dbConnect/dbConnect.js')
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
const postRoutes = require('./handlers/blogPostRoutes');
const userRoutes = require('./handlers/userRoutes');
const customMiddleware = require('./middlewares/middlewares');

const PORT = process.env.PORT || 3000

const app = express()
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload({
    createParentPath: true,
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))
app.use(customMiddleware.validatePostForm)


// post routes
app.get('/', postRoutes.homePage)
app.get('/about', postRoutes.aboutPage)
app.get('/contact', postRoutes.contactPage)
app.get('/post/new', customMiddleware.validatePostForm, postRoutes.createPost)
app.post('/post/store', postRoutes.postStore)
app.get('/post/:id', postRoutes.postPage)


// user routes
app.get('/auth/register', userRoutes.registerUser)
app.post('/users/register', userRoutes.doRegister)
app.get('/auth/login', userRoutes.userLogin)
app.post('/users/login', userRoutes.doLogin)


app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})