const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
const linkToMongodb = 'mongodb://maverick:maverick5@ds139989.mlab.com:39989/star-wars-quotes'

var db;
MongoClient.connect(linkToMongodb, (err, database) => {
  if(err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
 })
})

// app.use method is for middlewares
// place before handlers
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/index.html')
  db.collection('quotes').find().toArray(function(err, results){
    if(err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: results
    })
  })
})

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
      if(err) return console.log(err)

      console.log('saved to database')
      res.redirect('/')
    })
})