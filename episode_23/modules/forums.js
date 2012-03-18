var util = require('util')

exports.index = function(req, res){
  switch(req.format){
    case 'xml': res.send('bla'); break;
    case 'json': res.send('json');
  }
}


exports.new = function(req, res){
    photos.list(function(err, photo_list){
      if (err){
        throw err;
      }
    
    res.render('forums/new', {locals: {
    photos: photo_list,
    forum: req.body && req.body.forum || new Forum()
    }})
  });
};
    
exports.show = function(req, res){
     res.send('forums#show: ' + util.inspect(req.forum))
   }

exports.edit = function(req, res) {
  res.send('forums#edit: ' + util.inspect(req.forum))
};

exports.update = function(req, res){
  var id = req.params.id;
  Forum.findById(id, function(forum){


  forum.name = req.body.forum.name;
  forum.description = req.body.forum.description;
  forum.price = req.body.forum.price;
  forum.photo = req.body.forum.photo;
  forum.save(function(){
    res.redirect('forums/' + forum._id.toHexString())
  });
  });
  };

exports.create = function(req, res){
  var forum = new Forum(req.body.forum);
  Forum.save(function(){
      res.redirect('/forums/' + forum._id.toHexString());
    })
  var id = forums.insert(req.body.forum)
    res.redirect('/forums/' + id)
    } 

    exports.load = function(id, callback){
  callback(null, {id: id, name: "Forum #" + id})
}