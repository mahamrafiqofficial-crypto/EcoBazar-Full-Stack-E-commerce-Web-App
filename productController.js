import db from '../config/db.js'


//Get all products api
export const GetAllProducts = (req , res)=>{
     const sql = "SELECT * FROM products";
          db.query(sql, (err, result )=> {
            
            if(err){
               res.json({
                status:false,
                message:"Unable to Fetch Products !"
               });
            }else{
            res.json({
                status:true,
                products:result
            });
            }
          });
};

//Product Detail Api

export const GetProductDetail = (req , res)=>{   //When we us export default it exposrt only one thing if wanna export multiple things from the same file then we use export

    const productId = req.params.id;
  const sql = "SELECT * FROM products WHERE id=?";
  db.query(sql, [productId] , (err, result)=>{
    if(err){
        res.json({
            status:false,
            message:"Unable to Fetch Product Detail !"
        });
    }else{
        res.json({
            status:true,
            message:"Products Detail !",
            product:result[0]
        });
    }
  });
}