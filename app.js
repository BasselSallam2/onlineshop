const express = require('express') ;
const path = require('path') ;
const app = express() ;

const shoprouter = require('./Routes/shop') ;
const defultrouter = require('./Routes/defult') ;
const adminrouter = require('./Routes/admin') ;
app.set('view engine' , 'ejs') ;
app.set('views' ,'Views') ;

app.use('/' , express.static(path.join(__dirname, 'Public')));
app.use('/shop' , express.static(path.join(__dirname, 'Public')));
app.use('/admin' , express.static(path.join(__dirname, 'Public')));

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/shop' ,shoprouter );
app.use('/admin' ,adminrouter ) ;


app.use('/' ,defultrouter ) ;


app.listen(3000) ;








