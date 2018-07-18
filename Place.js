const mongoose = require('mongoose');

const db = 'mongodb://qh_leow:Hansolo9@ds121301.mlab.com:21301/placesapp';
//mongoose.Promise = global.Promise;
const appname='placesdb2018';
const collection ='placesappcollection';
mongoose
  .connect(db)
  .then(() => {
    console.log('mongoose connected to mongodb');
  })
  .catch(error => {
    console.log('mongoose connection error: ', error);
  });

const placeSchema = new mongoose.Schema({
  name: {
    type: String
  },
  aliases: {
    type: String
  },
  publisher: {
    type: String
  },
  gender: {
    type: String
  },
  race: {
    type: String
  },
  image: {
    type: String
  },
  hero: {
    type: String
  }

});

// if no specify collectioname, it will create places collection
// ie lowercase Place and pluralize it
const Place = mongoose.model('Place', placeSchema, 'placesappcollection');

module.exports = Place;
