const fs = require("fs");
const path = require("path");

const cartDataPath = path.join(__dirname, "../", "data", "cart.json");

module.exports = class Cart {
    

  static fetchAllCart(cb){
   
      fs.readFile(cartDataPath, (err, content) => {
        if (err) {
          cb([]);
        } else {
          cb(JSON.parse(content));
        }
      });
   

  }
  static addProduct(id, productPrice) {
    // fetching The all data

    let cart = { product: [], totlePrice: 0 };

    fs.readFile(cartDataPath, (err, content) => {
      cart = { product: [], totlePrice: 0 };

      if (!err) {
        cart = JSON.parse(content);
      }

      //    analyse the data is exist or not

      const existedProductIndex = cart.product.findIndex(el => el.id === id);
      const existedProduct = cart.product.find(el => el.id === id);
      
      let updatedData;

      if (existedProduct) {
        updatedData = { ...existedProduct };
        updatedData.qty = updatedData.qty + 1;
        cart.product[existedProductIndex]=updatedData
        
      }
      else{
        updatedData={id:id,qty:1}
        cart.product.push(updatedData)
    }

      cart.totlePrice = Number(cart.totlePrice) + Number(productPrice);

      fs.writeFile(cartDataPath,JSON.stringify(cart),(err)=>{

throw err 
     })
    });
  }
};
