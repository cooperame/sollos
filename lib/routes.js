Router.configure({
	layoutTemplate: 'index'
});

Router.onBeforeAction(function() {
    //wait login to render first page
    this.wait(function() {return !Meteor.loggingIn(); });
    this.next();
});


/* USER */

Router.route('/', function() {
	if(Meteor.user()) {
		this.redirect('products');
	} else {
		this.render('landing');
	}
}, {name: 'home'});

Router.route('/profile', function() {
	if(Meteor.user()) {
		this.render('ProfileTemplate');
	}
}, {name: 'profile'});

Router.route('/logout', function() {
	Meteor.logout();
	this.redirect('home');
}, {name: 'logout'});

/* PRODUCT */

Router.route('/products', function () {
	if(Meteor.user()) {
		this.render('ProductsTemplate');
	} else {
		this.redirect('home');
	}
}, {name: 'products'});

Router.route('/products/new', function () {
	this.render('NewProductTemplate');
}, {name: 'product.new'});

Router.route('/product/:_id', function () {
	this.render('ProductTemplate', {
		data: function () {
			return Products.findOne({_id: this.params._id});
		}
	});
}, {name: 'product.show'});

/* COOPERATIVE */

Router.route('/cooperatives', function () {
	this.render('CooperativesTemplate', {
		data: function () {
			return Cooperatives.find();
		}
	});
}, {name: 'cooperatives'});

Router.route('/cooperative/:_id', function () {
	this.render('CooperativeTemplate', {
		data: function () {
			return Cooperatives.findOne({_id: this.params._id});
		}
	});
}, {name: 'cooperative.show'});

/* PAYMENT */

Router.route('/product/:_id/checkout', function () {
	this.render('BuyProductTemplate', {
		data: function () {
			return Products.findOne({_id: this.params._id});
		}
	});
}, {name: 'product.buy'});

Router.route('/checkout/success', function () {
	this.render('PaymentSuccessTemplate', {
		data: function () {
			return Products.findOne({_id: this.params._id});
		}
	});
}, {name: 'payment.success'});