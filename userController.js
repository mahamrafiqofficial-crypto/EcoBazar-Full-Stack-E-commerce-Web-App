import db from '../config/db.js';

export const userLogin = (req, res)=> {
const {email,pass}= req.body;

    const sql ="SELECT * FROM userss WHERE email=?";
    db.query(sql,  [email] , (err, result)=> {
        if(err){
           return res.json({
            status:false,
            message:"Unable to Login Users !"
           });
        }
        if(result.length ==0){
            return res.json({
                status:false,
                message: "User is not registered!"
            });
        }

        const user =result[0];
        if(user.password != pass){
            return res.json({
                status:false,
                message: "Invalid Credentials !"
            });
        }

        res.json({
                status:true,
                message: "Login Success !",
                user:user
            });
        

    });
};


export const userRegister = (req, res)=>{
    const {
        firstname,
        lastname,
        username,
        email,
        password,
        phonenumber,
        address,
        postalcode
    } = req.body;

    // Check if email already exists
    const checkSql = "SELECT * FROM userss WHERE email = ?";

    db.query(checkSql, [email], (err, result) => {

        if (err) {
            return res.json({
                status: false,
                message: "Unable to register!"
            });
        }

        if (result.length > 0) {
            return res.json({
                status: false,
                message: "Email already registered!"
            });
        }

        // Insert new user
        const insertSql = `
            INSERT INTO userss 
            (firstname, lastname, username, email, password, phonenumber, address, postalcode)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
            insertSql,
            [
                firstname,
                lastname,
                username,
                email,
                password,
                phonenumber,
                address,
                postalcode
            ],
            (err, result) => {

                if (err) {
                    return res.json({
                        status: false,
                        message: "Registration failed!"
                    });
                }

                return res.json({
                    status: true,
                    message: "User registered successfully!",
                    userId: result.insertId
                });
            }
        );
    });
}