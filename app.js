const express = require('express');
const ejs = require('ejs');
const userRoutes = require('./handlers/userRoutes');

const PORT = process.env.PORT || 3000

const app = express()
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', userRoutes.homePage)
app.get('/about', userRoutes.aboutPage)
app.get('/contact', userRoutes.contactPage)
app.get('/post', userRoutes.postPage)


app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})