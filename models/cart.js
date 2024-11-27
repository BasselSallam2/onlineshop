const Product = require('./product') ;
const fs = require('fs');
const path = require('path');

const p = path.join(
path.dirname(process.mainModule.filename),
'data',
'cart.json'
);

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
      if (err || fileContent.toString().trim() === '') {
        // If there's an error or file is empty, return an empty array
        cb([]);
      } else {
        try {
          cb(JSON.parse(fileContent));
        } catch (parseErr) {
          console.error('Error parsing JSON:', parseErr);
          cb([]); // Return an empty array if JSON parsing fails
        }
      }
    });
  };
  

const WriteOnFile = (Data , cb) => {
    fs.writeFile(p, JSON.stringify(Data), (err) => {
        if (err) {
            console.log(err);
        }else {
            cb() ;
        }
    });
};


module.exports = class Cart {
    static AddtoCart(id, price, url , title , cb) {
        let Addedcart = [{"products" : {
            'id' : id,
            'qty' : 1,
            'URL' : url ,
            'title' : title ,
        }, 'totalprice' : +price}];

        getProductsFromFile(oldcart => {
            if (oldcart.length == 0) {
                WriteOnFile(Addedcart , cb) ;
                
            } else {
                let MatchIndex = oldcart.findIndex(item => item.products.id == id);
                if (MatchIndex == -1) {
                    let NewCart = [...oldcart, ...Addedcart];  // Spread the Addedcart object into the new array
                    WriteOnFile(NewCart , cb) ;
                    
                }else{
                    let NewCart = [...oldcart] ;
                    NewCart[MatchIndex].products.qty ++ ;
                    NewCart[MatchIndex].totalprice = NewCart[MatchIndex].totalprice + (NewCart[MatchIndex].totalprice / (NewCart[MatchIndex].products.qty - 1)) ;
                    WriteOnFile(NewCart , cb) ;
                    

                }
            }
        });

    }



static fetchCart(cb) {
    getProductsFromFile(cb);
}



static DeleteCart (ID , cb) {
    getProductsFromFile(pro => {
      const INDEX = pro.findIndex(product =>  product.products.id == ID ) ;
if(INDEX !== -1) {
        let NewProducts = pro ;
        NewProducts.splice(INDEX, 1);
        fs.writeFile(p, JSON.stringify(NewProducts), err => {
          console.log(err);
        });
      }
    });
  cb() ;
}
  

};