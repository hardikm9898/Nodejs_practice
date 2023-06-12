const { ObjectId } = require("mongodb");
const { getDb } = require("../data/connect");

class User {
  constructor(userName, email, cart, id) {
    this.userName = userName;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  addToCart(product) {
    const cartIndex = this.cart.items.findIndex((cp) => {
      return cp.product_id.toString() == product._id.toString();
    });
    let newQuentity = 1;
    const updatedItems = [...this.cart.items];

    if (cartIndex >= 0) {
      newQuentity = this.cart.items[cartIndex].quentity + 1;
      updatedItems[cartIndex].quentity = newQuentity;
    } else {
      updatedItems.push({ product_id: product._id, quentity: newQuentity });
    }

    const updatedCart = { items: updatedItems };

    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  deleteItemsFormCart(productId) {
    const updatedItems = this.cart.items.filter((item) => {
      return item.product_id.toString() !== productId.toString();
    });

    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedItems } }
      );
  }
  async addOrder() {
    try {
      const db = getDb();

      await db.collection("orders").insertOne({ orderItem: this.cart });

      this.cart = { items: [] };

      const updatedProduct = await db
        .collection("users")
        .updateOne(
          { _id: new ObjectId(this._id) },
          { $set: { cart: this.cart } }
        );
      return updatedProduct;
    } catch (error) {
      throw error.message;
    }
  }
  static findById(useId) {
    return getDb()
      .collection("users")
      .findOne({ _id: new ObjectId(useId) });
  }
}
module.exports = User;
