const express=require('express')

const router= express.Router()

router.use((req,res)=>{
res.render("user/404",{pageTitle:"404",path:"/404"})
})

module.exports=router