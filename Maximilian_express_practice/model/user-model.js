const fs = require("fs");
const path = require("path");

const jsonDataPath = path.join(__dirname, "../", "data", "data.json");

module.exports = class Product {
  constructor(id, username, userid) {
    this.id =id;
    this.username = username;
    this.userid = userid;
  }
  save() {
    if (this.id) {
      // find the index of existed id

      fs.readFile(jsonDataPath, (err, content) => {
        let product;
        if (!err) {
          product = JSON.parse(content);
        }
        const existedproductIndex = product.findIndex(
          (element) => element.id == this.id
        );

        product[existedproductIndex] = this;
        fs.writeFile(jsonDataPath,JSON.stringify(product),(err)=>{
            if (err) {
                console.log("err on writing file");
              } else {
                console.log("Product Save!");
              }
        })
      });
    } else {
      this.id = Math.floor(Math.random() * 100);
      fs.readFile(jsonDataPath, (err, content) => {
        let product;
        if (!err) {
          product = JSON.parse(content);
        }
        product.push(this);
        fs.writeFile(jsonDataPath, JSON.stringify(product), (err) => {
          if (err) {
            console.log("err on writing file");
          } else {
            console.log("Product Save!");
          }
        });
      });
    }
  }
  static fetchAll(cb) {
    fs.readFile(jsonDataPath, (err, content) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(content));
      }
    });
  }


  static findById(id, cb) {
    fs.readFile(jsonDataPath, (err, content) => {
      if (err) {
        cb([]);
      } else {
        const detailArray = JSON.parse(content);


        const productDetail = detailArray.find((el) => el.id == id);


        cb(productDetail);
      }
    });
  }

  static deletProduct(id)
  {
      fs.readFile(jsonDataPath,(err,content)=>{
          
          let product
          if(!err){
              product=JSON.parse(content)
            }


        const deleteProductIDIndex=product.findIndex(element=>Number(element.id)===Number(id))

   product.splice(deleteProductIDIndex,1)

        
     fs.writeFile(jsonDataPath,JSON.stringify(product),(err)=>{
      throw err
     })

    })


  }


};
