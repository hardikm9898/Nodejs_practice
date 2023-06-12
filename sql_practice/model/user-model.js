const db = require("../data/conncet");

module.exports = class Product {
  static save(id, username, userid) {
    if (id === null) {
      return db.execute(
        `INSERT INTO product(username,userid)VALUES("${username}","${userid}")`
      );
    }

    return db.execute(
      `UPDATE product SET username = "${username}", userid= "${userid}" WHERE id ="${id}"`
    );
  }

  static fetchAll() {
    return db.execute("SELECT*FROM product");
  }

  static findById(id) {
    return db.execute(`SELECT*FROM product WHERE id='${id}'`);
  }

  static deletProduct(id) {
    return db.execute(`DELETE  FROM product WHERE (id="${id}")`);
  }
};
