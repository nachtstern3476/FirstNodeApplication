const express = require('express');
const mongoose = require('mongoose');
const app = express();
const blogRoutes = require('./routes/blogRoutes');

const DB_URI = 'mongodb+srv://nachtstren:kazehaya@belajarnode.5ceq1.mongodb.net/belajarnode?retryWrites=true&w=majority'
mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
	.then((result)=> app.listen(3000))
	.catch((err)=> console.log(err))
app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));

app.get('/', function(req, res) {
	res.redirect('/blogs');
})
app.get('/about', function(req, res) {
	res.render('about', {title: 'About'});
})

// Init blog routes
app.use('/blogs', blogRoutes)

app.use((req, res)=>{
	res.status(404).render('404', {title: 'Error'});
})

