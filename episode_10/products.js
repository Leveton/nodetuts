var products = [
{
	id: 1,
	name: 'Mac Book Pro',
	description: 'Apple 13 inch Mac Book Pro Notebook',
	price: 1000
},
{
	id: 2,
	name: 'iPad',
	description: 'Apple 64GB 3G iPad',
	price: 899
}
];

module.exports.all = products;

module.exports.find = function(id){
	id = parseInt(id, 10);
	var found = null;
	prodductloop: for(product_index in products) {
		var product = products[product_index];
		if(product.id == id){
			found = product;
			break prodductloop;
		}
	};
	return found;
}