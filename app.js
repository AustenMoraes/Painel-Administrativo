const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database')

const categoriesController = require('./categories/categoriesController');
const articlesController = require('./articles/articlesController');

const Article = require('./articles/Article');
const Category = require('./categories/Category');

// view engine
app.set('view engine', 'ejs');


// body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// static 
app.use(express.static('public'))

// database

connection.authenticate().then(()=>{
    console.log('sucesso na conexão')
  }).catch(error => {console.log(error)}) 


app.get('/', (req, res)=>{
  res.render('index');
})

app.use('/', categoriesController) 
app.use('/', articlesController) 


app.listen(8080, ()=>{
  console.log('o servidor esta rodando')
})