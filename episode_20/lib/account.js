var Account = function() {
	this.balance = 0;
}

module.exports.create = function() {
	return new Account();
};

Account.prototype.credit = function(amount){
	this.balance += amount
}

Account.prototype.debit = function(amount){
	this.balance -= amount
}

Account.prototype.transferTo = function(account, amount){
	if (this.balance < amount){
		throw new Error('not enough funds')
	}
	this.balance -= amount
	account.balance += amount
}