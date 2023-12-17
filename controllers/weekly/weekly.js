import {data} from '../../index.js';

export const getallData =(req,res)=>{
    data.getConnection((err,connection)=>{
        if (!err){
            connection.query('SELECT * FROM pmsweekly',(err,rows)=>{
                connection.release()

                console.log(rows)
                
                const data = {
                    'monday': (rows[0]?.days==='monday') ? Number(rows[0].hhc) + Number(rows[0].zonal) + Number(rows[0].public) : '0',
                    'tuesday': (rows[0]?.days==='tuesday') ? Number(rows[0].hhc) + Number(rows[0].zonal) + Number(rows[0].public) : '0',
                    'wednesday': (rows[0]?.days==='wednesday') ? Number(rows[0].hhc) + Number(rows[0].zonal) + Number(rows[0].public) : '0',
                    'thursday': (rows[0]?.days==='thursday') ? Number(rows[0].hhc) + Number(rows[0].zonal) + Number(rows[0].public) : '0',
                    'friday': (rows[0]?.days==='friday') ? Number(rows[0].hhc) + Number(rows[0].zonal) + Number(rows[0].public) : '0',
                    'saturday': (rows[0]?.days==='saturday') ? Number(rows[0].hhc) + Number(rows[0].zonal) + Number(rows[0].public) : '0',
                    'sunday': (rows[0]?.days==='sunday') ? Number(rows[0].hhc) + Number(rows[0].zonal) + Number(rows[0].public) : '0'
                }
                
                return res.json(data)
            })
        }
    })
}




