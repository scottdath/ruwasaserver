import {data} from '../../index.js';

export const getallpdData =(req,res)=>{
    data.getConnection((err,connection)=>{
        if (!err){
            connection.query('SELECT * FROM pdmessages',(err,rows)=>{
                connection.release()
                return res.status(200).json(rows)
            })
        }
    })
}

export const getallmeterData =(req,res)=>{
    data.getConnection((err,connection)=>{
        if (!err){
            connection.query('SELECT * FROM pdmeters',(err,rows)=>{
                connection.release()
                return res.status(200).json(rows)
            })
        }
    })
}

export const getpdData =(req,res)=>{
    data.getConnection((err,connection)=>{
        if (!err){
            connection.query('SELECT * FROM pdmessages WHERE address=?',[(req.params.id).toUpperCase()],(err,rows)=>{
                connection.release()
                console.log(rows)
                return res.json(rows[0])
            })
        }
    })
}

export const getpdMeter =(req,res)=>{
    data.getConnection((err,connection)=>{
        if (!err){
            connection.query('SELECT * FROM pdmeters WHERE meterno=?',[(req.params.id).toUpperCase()],(err,rows)=>{
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
            connection.query('SELECT * FROM pdmessages',(err,rows)=>{
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
            connection.query('SELECT * FROM pdmessages',(err,rows)=>{
                connection.release()
                console.log(req.body)

                const metertype = req.body.metertype 
                const meterid = req.body.meterid
                const username = req.body.username 
                const region = req.body.region 
                const location = req.body.location 
                const regionId = req.body.regionId 
                const address = req.body.address
                const userId = req.body.userId
                

                const q = "UPDATE pdmessages SET metertype=?,meterid=?,address=?,username=?,userId=?,region=?,location=?,regionId=? WHERE address = ?"

                data.query(q,[metertype,meterid,address,username,userId,region,location,regionId,(req.params.id).toLowerCase()],(err,data)=>{
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



export const updateMeterDetails =(req,res)=>{
    data.getConnection((err,connection)=>{
        if (!err){
            connection.query('SELECT * FROM pdmeters',(err,rows)=>{
                connection.release()
                console.log(req.body)

                const metertype = req.body.metertype 
                const meterid = req.body.meterid
                const region = req.body.region
                const location = req.body.location
                const regionId = req.body.regionId
                

                const q = "UPDATE pdmeters SET metertype=?,meterid=?,region=?,location=?,regionid=? WHERE meterno = ?"

                data.query(q,[metertype,meterid,region,location,regionId,(req.params.id).toLowerCase()],(err,data)=>{
                    if (err) {
                        console.log(err)
                    }else{
                        console.log(" data - updated successful!");
                        return res.status(200).json(`${(req.params.id).toUpperCase()} updated succesfully!`)
                    }
                    
                })
        
            })
        }
    })
}


export const deleteUser =(req,res)=>{
    data.getConnection((err,connection)=>{
        if (!err){
            connection.query('SELECT * FROM pdmessages',(err,rows)=>{
                connection.release()
          
            const postId = req.params.id 
            const q  = "DELETE FROM pdmessages WHERE `address`= ?"
            data.query(q,[req.params.id],(err,data)=>{
                if (!err) return res.status(200).json(`User id: ${req.params.id} deleted!`)
            
            })
                
            })
        }
    })
}


export const deleteMeter =(req,res)=>{
    data.getConnection((err,connection)=>{
        if (!err){
            connection.query('SELECT * FROM pdmeters',(err,rows)=>{
                connection.release()
          
            const postId = req.params.id 
            const q  = "DELETE FROM pdmeters WHERE `meterno`= ?"
            data.query(q,[req.params.id],(err,data)=>{
                if (!err) return res.status(200).json(`User id: ${req.params.id} deleted!`)
            
            })
                
            })
        }
    })
}


