import {data} from '../../index.js';



export const updateBills =(req,res)=>{
    data.getConnection((err,connection)=>{
        if (!err){
            connection.query('SELECT * FROM hhcmessages',(err,rows)=>{
                connection.release()
                console.log(req.body)
                
                const bill = rows[0].bill
                const billing = Number(bill) + Number(req.body.bill)

                const q = "UPDATE hhcmessages SET bill = ? WHERE meterno = ?"

                data.query(q,[billing,(req.params.id).toLowerCase()],(err,data)=>{
                    if (err) {
                        console.log(err)
                    }else{
                        console.log(" data updated successful!");
                        return res.status(200).json(`${(req.params.id).toUpperCase()} billed succesfully!`)
                    }
                    
                })
        
            })
        }
    })
}