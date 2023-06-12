const Product = require("../model/user-model");
const { success, error } = require("../responce-Api/responce");

const getUser = async (req, res) => {
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


const getProductDetails = async (req, res) => {



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
  }
module.exports={
  getProductDetails,getUser
}


 

