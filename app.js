require('./dbConnect/dbConnect.js')
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
const userRoutes = require('./handlers/blogPostRoutes');
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

app.get('/', userRoutes.homePage)
app.get('/about', userRoutes.aboutPage)
app.get('/contact', userRoutes.contactPage)
app.get('/post/new', customMiddleware.validatePostForm, userRoutes.createPost)
app.post('/post/store', userRoutes.postStore)
app.get('/post/:id', userRoutes.postPage)


app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})