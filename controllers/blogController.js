const Blog = require('../models/blog');

const blog_index = function(req, res){
	Blog.find().sort({createdAt: -1})
		.then(result=>{
			res.render('blogs/index', {title: 'All Blogs', blogs: result});
		}).catch(err=>{
			console.log(err)
		})
}

const blog_detail = function(req, res){
	const id = req.params.id;
	Blog.findById(id).then(result=>{
		res.render('blogs/detail', {title: 'Blog Detail', blog: result});
	}).catch(err=>{
		res.status(404).render('404', {title: 'Blog not found'});
		console.log(err)
	})
}
const blog_create_get = function(req, res){
	res.render('blogs/create', {title: 'Create Page'});
}

const blog_create_post = function(req, res){
	const blog = new Blog(req.body);
	blog.save()
		.then(result=>{
			res.redirect('/blogs');
		}).catch(err=>{
			console.log(err)
		})
}

const blog_delete = function(req, res){
	const id = req.params.id;

	Blog.findByIdAndDelete(id)
		.then(result=>{
			res.json({redirect:'/blogs', message:'Berhasil'});
		}).catch(err=>{
			console.log(err);
		})
}
module.exports = {
	blog_index,
	blog_detail,
	blog_create_get,
	blog_create_post,
	blog_delete
}