import {data} from '../../index.js';

export const gethhcallData =(req,res)=>{
    data.getConnection((err,connection)=>{
        if (!err){
            connection.query('SELECT * FROM hhcmessages',(err,rows)=>{
                connection.release()
                return res.json(rows)
            })
        }
    })
}

export const gethhcData =(req,res)=>{
    data.getConnection((err,connection)=>{
        if (!err){
            connection.query('SELECT * FROM hhcmessages WHERE meterno=?',[(req.params.id).toUpperCase()],(err,rows)=>{
                connection.release()
                console.log(rows)
                return res.json(rows[0])
            })
        }
    })
}

export const gettotalData =(req,res)=>{
    data.getConnection((err,connection)=>{
        if (!err){
            connection.query('SELECT * FROM hhcmessages',(err,rows)=>{
                connection.release()
                if (rows.length > 0){
                const lengthdata = rows.length - 1
                let idx = 0;
                let total = 0;

                while(idx<=lengthdata){
                    let litas = rows[idx].litres
                    total = Number(total) + Number(litas) 
                    if (idx === lengthdata){
                        return res.status(200).json(total.toFixed(2))
                    }
                    idx += 1;
                }
            }else{
                return res.status(200).json(0)
            }
        
            })
        }
    })
}

export const updateDetails =(req,res)=>{
    data.getConnection((err,connection)=>{
        if (!err){
            connection.query('SELECT * FROM hhcmessages',(err,rows)=>{
                connection.release()
                console.log(req.body)

                const metertype = req.body.metertype 
                const meterid = req.body.meterid
                const username = req.body.username 
                const region = req.body.region 
                const location = req.body.location 
                const regionId = req.body.regionId 
                

                const q = "UPDATE hhcmessages SET metertype=?,meterid=?,username=?,region=?,location=?,regionId=? WHERE meterno = ?"

                data.query(q,[metertype,meterid,username,region,location,regionId,(req.params.id).toLowerCase()],(err,data)=>{
                    if (err) {
                        console.log(err)
                    }else{
                        console.log(" data updated successful!");
                        return res.status(200).json(`${(req.params.id).toUpperCase()} updated succesfully!`)
                    }
                    
                })
        
            })
        }
    })
}

export const deleteMeter =(req,res)=>{
    data.getConnection((err,connection)=>{
        if (!err){
            connection.query('SELECT * FROM hhcmessages',(err,rows)=>{
                connection.release()
          
            const postId = req.params.id 
            const q  = "DELETE FROM hhcmessages WHERE `meterno`= ?"
            data.query(q,[req.params.id],(err,data)=>{
                if (!err) return res.status(200).json(`Meter id: ${req.params.id} deleted!`)
            
            })
                
            })
        }
    })
}

