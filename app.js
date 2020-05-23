//jshint esversion:6

// requiring the npm modules or frameworks
const express = require("express");
const bodyParser = require("body-parser");
//requring the lodash module
const _ = require('lodash');
//embedded javascript template
const ejs = require("ejs");
// some content 
const homeStartingContent = "This is a home page. It's Just a text you can write here anything. Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "This is a about page. It's Just a text you can write here anything. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "This is a contact page. It's Just a text you can write here anything. Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
//defining the web app
const app = express();
//setting the view engine for ejs
app.set('view engine', 'ejs');
//to post the form data
app.use(bodyParser.urlencoded({extended: true}));
//use the css files in the blog website by using the public folder or static files in public folder 
app.use(express.static("public"));
//making a global variable
let posts = [];
//making a root directory
app.get("/",function(req,res){

	//rendring the home.ejs route and send the data to the ejs
	res.render("home",{homeStartingContentBlog: homeStartingContent, posts:posts});
	//console.log(posts);
});
app.get("/about",function(req,res){

	//rendring the about.ejs route and send the data to the ejs
	res.render("about",{aboutStartingContentBlog: aboutContent});
});
app.get("/contact",function(req,res){

	//rendring the contact.ejs route and send the data to the ejs
	res.render("contact",{contactStartingContentBlog: contactContent});
});
app.get("/compose",function(req,res){

	//rendring the compose.ejs route and send the data to the ejs
	res.render("compose");
});
app.post("/compose",function(req,res){
	//take the request from the compose
	const completeBlog = {
		title: req.body.composeTitle,
		body: req.body.composePost
	};
	//console.log(completeBlog);
	posts.push(completeBlog);
	res.redirect("/");
	//console.log(completeBlog)

});
//express routing parameter
app.get("/posts/:postName",function(req,res){
	//take the post name 
	let topic = req.params.postName
	//using lodash to convert the string into lower case
	let lowerTopic = _.lowerCase(topic)
	//console.log(lowerTopic);
	//taking the post title
	posts.forEach(function(post){
	 	let storeTitle = post.title;
	 	//using lodash to convert the string into lower case also convert (-) into space
	 	let lowerStoreTitle = _.lowerCase(storeTitle)
	 	if (lowerStoreTitle === lowerTopic){
	 		res.render("post",{title1:post.title,content1:post.body})
	 	}else{
	 		console.log("not found");
	 	}
	})
});
//listen at the port 3000
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
