const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
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


module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.productID = Math.random().toString() ;
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }


static fetchID(ID , cb) {
  getProductsFromFile(products => {
    const p = products.find(product => product.productID == ID);
    cb(p) ;
  });

}

static EditProduct(title , URL , price , description , ID , cb) {
  getProductsFromFile(products => {
    const INDEX = products.findIndex(product => ' ' + product.productID == ID ) ;
    console.log(INDEX) ;
    products[INDEX].title = title ;
    products[INDEX].imageUrl = URL ;
    products[INDEX].description = description ;
    products[INDEX].price = price ;
    fs.writeFile(p, JSON.stringify(products), err => {
      console.log(err);
    });
  });
  cb() ;
  }

  static DeleteProduct (ID , cb) {
    getProductsFromFile(products => {
      const INDEX = products.findIndex(product =>  product.productID == ID ) ;
      let NewProducts = products ;
      NewProducts.splice(INDEX, 1);
      fs.writeFile(p, JSON.stringify(NewProducts), err => {
        console.log(err);
      });
  });
  cb() ;
}
  

};
