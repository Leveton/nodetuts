var Adder = function(a, b){
	this.a = a;
	this.b = b;

};

Adder.prototype.add = function(){
	return this.a + this.b
};

module.exports = Adder;