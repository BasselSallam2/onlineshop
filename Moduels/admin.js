path = require('path') ;
const datapath = path.join(__dirname,'..' , 'Database' , 'data.json');
const fs = require('fs') ;

module.exports = class Products {

 constructor(name , url , desc,price) {

  this.name = name ;
  this.url = url ;
  this.desc = desc ;
  this.price = price ;

 }

 save() {
 let products = [] ;
 fs.readFile(datapath , (err , Data) => {
    if(err || Data.toString().trim() === '' ) {
         products.push(this) ;
    }else {
        products = JSON.parse(Data) ;
        products.push(this) ;
    }

    fs.writeFile(datapath , JSON.stringify(products) , err => {
        if(err) {
        console.log(err) ;
        }
    });
});

    
 
 
 }




 static fitchAll(cb) {

    let products = [] ;
 fs.readFile(datapath , (err , Data) => {
    if(err || Data.toString().trim() === '') {
        cb([]) ;
    }else {
        products = JSON.parse(Data) ; 
        cb(products) ;  
 }
    
 });

}


}