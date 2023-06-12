const { ObjectId } = require("mongodb");

const { getDb } = require("../data/connect");

module.exports = class Product {
  constructor(title, price, description, userID) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.userID = userID;
  }

  save() {
    return getDb().collection("products").insertOne(this);
  }
  static fetchAll() {
    return getDb().collection("products").find().toArray();
  }

  static async fetchById(proId) {
    const convertStringToObject = new ObjectId(proId);

    try {
      const result = await getDb()
        .collection("products")
        .findOne({ _id: convertStringToObject });
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateProduct(productId, title, price, description) {
    const convertStringToObject = ObjectId.createFromHexString(productId);
    try {
      return await getDb()
        .collection("products")
        .updateOne(
          { _id: convertStringToObject },
          { $set: { title, price, description } }
        );
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async deleteProduct(productId) {
    try {
      const convertStringToObject = ObjectId.createFromHexString(productId);
      return await getDb()
        .collection("products")
        .deleteOne({ _id: convertStringToObject });
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
