const mongoose = require('mongoose');
const Store = mongoose.model('Store');


exports.homePage = ( req, res ) =>{
	res.render('index');
};

exports.addStore = (req, res) => {
	res.render('addStore', { title: 'Add Store' });
};

exports.createStore = async(req, res) => {
	const store = await (new Store(req.body)).save();
  req.flash( 'sucess', `Sucessfully Created ${store.name}. Care to leave a review?` );
	res.redirect(`/store/${store.slug}`);
};

exports.getStores = async( req, res ) => {
  const stores = await Store.find();
  console.log( stores );
  res.render( 'stores', { title: 'Stores', stores } )
};

exports.editStore = async ( req, res ) => {
  //1. Find the store given the ID
  const store = await Store.findOne( { _id: req.params.id } );
  res.json( store );
  //2. confirm they are the owner of the store
  //3. render out the edit form so the user can updated the store.
  res.render( 'editStore', { title: `Edit ${store.name}`, store } );

};