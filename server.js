const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

/*
app.use(( req, res, next) => {
  res.render('maintenance.hbs');
});
*/

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>{
  return  new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!</h1>')
  /*
  res.send({
    name: 'Vitaly',
    likes: [
      'Biking',
      'Cities'
    ]
  })
  */
  res.render('home.hbs', {
    welcomeMessage: 'Welcome to my website',
    pageTitle: 'Home Page'
  });
});

app.get('/about', (rew, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
} );

app.get('/bad', (rew, res) => {
  res.send({
    errorMessage: 'Unable to handle this request'
  })
} );

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
