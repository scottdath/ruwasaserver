import { data } from "../../index.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken' 

export const register = (req,res)=>{

    
    const q = "SELECT * FROM hhcmessages WHERE meterid = ? ";
   data.query(q,[req.body.meterid],(err,datas)=>{
    if (err) return res.json(err)
    if (datas.length) return res.status(409).json("Meter Id exists!")

   


    data.getConnection((err, connection) => {
        if(err) throw err

                
        const params = req.body;

        console.log(params)


        
        connection.query('INSERT INTO hhcmessages SET ?', params, (err, rows) => {
        connection.release() 
        if (!err) {
            // console.log("account create successful")
            return res.status(200).json("Meter registered successful!")
        } else {
            return res.json(err)
        }
        
        })

       

    })

    


   })
}


