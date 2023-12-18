import {data} from '../../index.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken' 



export const register = (req,res)=>{

    
    const q = "SELECT * FROM user WHERE id = ? OR name = ? ";
   data.query(q,[req.body.id,req.body.username],(err,datas)=>{
    if (err) return res.json(err)
    if (datas.length) return res.status(409).json("User already exists!")

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password,salt)


    data.getConnection((err, connection) => {
        if(err) throw err

                
        const params = req.body;
        params.password = hash;

        createTables(req.body.id)

        // console.log(params)


        
        connection.query('INSERT INTO user SET ?', params, (err, rows) => {
        connection.release() 
        if (!err) {
            // console.log("account create successful")
            return res.status(200).json("Account created successful!")
        } else {
            return res.json(err)
        }
        
        })

       

    })

    


   })
}

export const login = (req,res)=>{
    console.log(req.body)
    data.getConnection((err, connection) => {
        if(!err) {
        connection.query('SELECT * FROM user WHERE username = ?', [req.body.username], (err, rows) => {
            connection.release() 
            if(err) return res.json(err);
            if(rows.length===0) return res.json("User not Found!")

            const isPasswordCorrect = bcrypt.compareSync(req.body.password,rows[0].password);
            if(!isPasswordCorrect) return res.json("Incorrect password!");

            const token = jwt.sign({id: rows[0].id},"ruwtoken")
            const {password,...other} = rows[0]
            const sent = [other,token]

            req.session.username = other
            // console.log( req.session.username)
            
            res.cookie('servtoken',token,{
                secure: true,
                httpOnly: true
            }).status(200).json(sent);
            
        })
    }
    })

}

export const loginSession=(req,res)=>{
    if (req.session.username){
        res.send({
            loggedIn: true,
            user: req.session.username
        })
    }else{
        res.send({loggedIn: false})
    }
}

export const logout = (req,res)=>{
   
    res.clearCookie("dormtoken",{
        sameSite: "none",
        secure: true
    }).status(200).json("Logged out!")
}
