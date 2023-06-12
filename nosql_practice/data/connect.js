const {MongoClient,ObjectId} = require("mongodb");

let _db;
mongoConnect = (client) => {
  MongoClient.connect("mongodb://localhost:27017/practice")
    .then( (client) => {

      console.log("connected!");
  
      _db =  client.db("practice")
        
    })
    .catch((err) => console.log(err));
};
const getDb = () => {
  if (_db) {
    return _db;
  } else {
    throw "No Database Found";
  }
};

module.exports = { mongoConnect, getDb };


