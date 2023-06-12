const Product = require("../model/user-model");
const { success, error } = require("../responce-Api/responce");

const addProduct = async(req, res) => {

  try {
    
    await Product.save(null,req.body.username, req.body.userid)
    res
    .status(200)
    .json(
      success("Success", { massage: " Product Added" }, res.statusCode)
    );


  } catch (err) {
    res.status(500).json(error("Something Went Wrong", res.statusCode));

  }


};

const addProductPage = (req, res) => {


  try {
    res
      .status(200)
      .json(
        success("Success", { massage: " Add Product Page" }, res.statusCode)
      );
  } catch (err) {
    res.status(500).json(error("Something Went Wrong", res.statusCode));
  }

};

const getAdminEditProduct = async(req, res) => {
  try {
    const id = req.params.prodctid;
   const editProductDetails=await Product.findById(id)
   res
      .status(200)
      .json(
        success("Success", { product: editProductDetails }, res.statusCode)
      )
  } catch (err) {
    res.status(500).json(error("Something Went Wrong", res.statusCode));

  }
};
const updateProduct = async(req, res) => {
  try {
    
    const productID = req.body.productid;
    const updateUserName = req.body.username;
    const updateUserId = req.body.userid;

    await Product.save(productID, updateUserName, updateUserId)
      res
      .status(200)
      .json(
        success("Success", { message:"product updated" }, res.statusCode)
      )
  } catch (err) {
    
     res
      .status(500)
      .json(
        error("Something Went Wrong", res.statusCode)
      )
  }
 


};

const getProductList = async (req, res) => {
try {
 const products = await Product.fetchAll()
 res
 .status(200)
 .json(
   success("Success", { products}, res.statusCode)
 )
} catch (err) {
      
  res
  .status(500)
  .json(
    error("Something Went Wrong", res.statusCode)
  )
}
  
};

const deleteProduct = async(req, res) => {
  try {
    
    const id = req.body.productid;
  
    await Product.deletProduct(id);
    res
    .status(200)
    .json(
      success("Success", { message:"product Deleted" }, res.statusCode)
    )
  } catch (err) {
    res
    .status(500)
    .json(
      error("Something Went Wrong", res.statusCode)
    )
  }
  
};


module.exports={
  deleteProduct,getProductList,updateProduct,getAdminEditProduct,addProductPage,addProduct
}



