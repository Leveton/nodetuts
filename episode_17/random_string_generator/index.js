var RandomStringGenerator = function(string_length){
	this.string_length = string_length || 6;
};

RandomStringGenerator.prototype.generate = function(){
    var chars = 'abcdefghijklmnopqrstuvwxyz';
	var randomstring = '';
	for (var i=0; i<this.string_length; i++){
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
};

module.exports.create = function(string_length){
	return new RandomStringGenerator(string_length);
};

module.exports._class = RandomStringGenerator;