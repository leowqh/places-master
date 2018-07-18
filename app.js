const axios = require ('axios');
const express = require ('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const server = express ();
const path =require('path');
//const filemgr = require('./filemgr');
const port = process.env.PORT || 5000;
const Place =require ('./Place')
server.use(bodyParser.urlencoded({extended:true}));
server.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')

var filteredResults;
if (process.env.NODE_ENV === 'production') {
  server.use(express.static('client/build'));
  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
hbs.registerHelper('list', (items, options)=>{
  items =filteredResults;
  var out = "<tr><th>Name</th><th>Address</th><th>photo</th></tr>";
  const length =items.length;
  for(i=0; i<length; i++){
    out = out + options.fn(items[i]);
  };
  return out
});


server.post('/historical',(req, res) =>{
  Place.remove({ "hero": "valid" }).find()
  .then((result)=>{
    res.status(200).send(result);
  }).catch((error)=>{
       res.status(400).send(error);
  });
});
server.post('/Delete',(req, res)=>{
    Place.remove()
    .then((result)=>{
res.status(200).send(result);
    }).catch((error)=>{
      res.status(400).send(error);
    });
});
server.get('/form',(req, res) =>{
  res.render('form.hbs');
});
server.use(express.static(path.join(__dirname, 'public')));

server.get('/',(req, res) =>{
  res.render('home.hbs');
});
server.post('/getplaces',(req,res)=>{

  const name=req.body.name;
  const locationReq = `http://www.superheroapi.com/api.php/1355165034619575/${name}`;

  axios.get(locationReq).then((response)=> {
if(response.data.name)
{
  const name=response.data.name;
  const aliases =response.data.biography.aliases[0];
  const publisher =response.data.biography.publisher;
  const gender=response.data.appearance.gender;
  const race = response.data.appearance.race;
  const image = response.data.image.url;
  const hero = {
    name: name,
    aliases: aliases,
    publisher: publisher,
    gender: gender,
    race: race,
    image: image,
    hero: "valid"
  };
  Place.insertMany(hero)
  .then((result)=> {
    res.status(200).send(result);

}).catch((error)=> {
  res.status(400).send(error);

});

}
else {
  const hero = {
    name: "No such heroes",
    aliases: "No such heroes",
    publisher: "No such heroes",
    gender: "No such heroes",
    race: "No such heroes",
    image: "No such heroes",
    hero: "invalid"
  };  Place.insertMany(hero)
  .then((result)=> {
    res.status(200).send(result);

}).catch((error)=> {
  res.status(400).send(error);
});

};



})
});

server.listen(port,() => {
  console.log(`Server started on port ${port}`);
});
