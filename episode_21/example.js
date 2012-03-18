var mongoose = require('mongoose')
  Schema = mongoose.Schema;

var CommentSchema = new Schema({
	email: String,
	body: String

});

var PostSchema = new Schema({
	title: String,
	body: String,
	date: {type: Date, default: Date.now},
	state: {type: String, enum: ['draft', 'published', 'private'], default: 'draft'},
    author: {
    	name: String,
    	email: {type: String, validate: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/}
    },
    comments: [CommentSchema]
});

PostSchema.static('recent', function(days, callback){
	days = days || 1;
	this.find({date: {$gte: Date.now() - 1000 * 60 * 60 * 24 * days}}, callback)
})

PostSchema.virtual('shortbody').get(function(){
	return this.body.substring(0,50);
});

mongoose.connect('mongodb://localhost/mydatabase')
mongoose.model('Post', PostSchema);

var Post = mongoose.model('Post');

var post = new Post();
post.title = 'My first blog post';
post.body = 'Post body a;dkja;kfja;fja;;aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaarrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr'
post.author.name = 'mike'
post.author.email = 'mleveton@prepcloud.com'
post.comments.push({email: 'vanbuskirk.info@gmail.com', body: 'comments'})
post.save(function(err){
	if (err){ throw err; }
	console.log('saved');
	Post.recent(10, function(err, posts){
		if (err){ console.log(err); throw err }
		console.log('found')
		posts.forEach(function(post){
			console.log(post.shortbody)
				mongoose.disconnect();

		})
	});
});