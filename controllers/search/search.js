import {data} from '../../index.js';

export const getallhhcData =(req,res)=>{
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

export const getallznData =(req,res)=>{
    data.getConnection((err,connection)=>{
        if (!err){
            connection.query('SELECT * FROM znmessages WHERE meterno=?',[(req.params.id).toUpperCase()],(err,rows)=>{
                connection.release()
                console.log(rows)
                return res.json(rows[0])
            })
        }
    })
}

export const getpduserData =(req,res)=>{
    data.getConnection((err,connection)=>{
        if (!err){
            connection.query('SELECT * FROM pdmessages WHERE userid=?',[(req.params.id).toUpperCase()],(err,rows)=>{
                connection.release()
                console.log(rows)
                return res.json(rows[0])
            })
        }
    })
}



