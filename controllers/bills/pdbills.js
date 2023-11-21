import {data} from '../../index.js';



export const updateBills =(req,res)=>{
    data.getConnection((err,connection)=>{
        if (!err){
            connection.query('SELECT * FROM pdmessages',(err,rows)=>{
                connection.release()
                console.log(req.body)
                
                const bill = rows[0].bill
                const billing = Number(bill) + Number(req.body.bill)

                const q = "UPDATE pdmessages SET bill = ? WHERE address = ?"

                data.query(q,[billing,(req.params.id).toUpperCase()],(err,data)=>{
                    if (err) {
                        console.log(err)
                    }else{
                        console.log(" data updated successful!");
                        const data = {
                            msg: `${(req.params.id).toUpperCase()} billed succesfully!`,
                            data: rows[0]
                        }
                        return res.status(200).json(data)
                    }
                    
                })
        
            })
        }
    })
}