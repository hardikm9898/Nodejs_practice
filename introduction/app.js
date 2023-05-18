
const http = require("http");

const fs = require("fs");
const url = require("url");

const replacecard = function (temp, product) {
  let output = temp.replaceAll("{%PRODUCTNAME%}", product.productName);
  output = output.replaceAll("{%IMAGE%}", product.image);
  output = output.replaceAll("{%QUANTITY%}", product.quantity);
  output = output.replaceAll("{%PRICE%}", product.price);
  output = output.replaceAll("{%FROM%}", product.from);
  output = output.replaceAll("{%NUTRIENTS%}", product.nutrients);
  output = output.replaceAll("{%DESCRIPTION%}", product.description);
  output = output.replaceAll("{%ID%}", product.id);

  console.log(product.organic);
  !product.organic
    ? (output = output.replaceAll("{%NOT_ORGANIC%}", "not-organic"))
    : (output = output.replaceAll("{%NOT_ORGANIC%}", "organic"));

  return output;
};

const overview = fs.readFileSync("./templete/templete-overview.html", "utf-8");

const fileReader = fs.readFileSync("./dev-data/data.json", "utf-8");

const javascriptObjectData = JSON.parse(fileReader);
const productRader = fs.readFileSync(
  "./templete/templete-product.html",
  "utf-8"
);
const cardReader = fs.readFileSync("./templete/templete-card.html", "utf-8");

http
  .createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);
    console.debug(
      "🚀 ~ file: app.js:41 ~ .createServer ~ url.parse(req.url):",
      url.parse(req.url)
    );

    if (pathname == "/overview") {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });

      const cardOutput = javascriptObjectData.map((element) =>
        replacecard(cardReader, element)
      );
      const output = overview.replace("{%PRODUCT_CARDS%}", cardOutput);
      res.end(output);
    } else if (pathname == "/product") {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      const product = javascriptObjectData[query.id];

      console.log(product);

      const output = replacecard(productRader, product);

      res.end(output);
    } else if (pathname == "/card") {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.end(cardReader);
    } else {
      res.end("page not found");
    }
  })
  .listen(5000, (err) => {
    console.log("app is listing on port no.5000");
  });


// const fs = require('fs')
// const http= require('http')

// const server=http.createServer((req,res)=>{
//   const body=[]

// // const data=JSON.stringify(req)
// const data=req.toString()
// // console.log(data)
// // res.end(req)
// res.end(data)
// })


// server.listen(3000,()=>{
//   console.log("server start on port no 3000")
// })

// console.log("hello")