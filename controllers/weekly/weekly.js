import {data} from '../../index.js';

export const getallData =(req,res)=>{
    data.getConnection((err,connection)=>{
        if (!err){
            connection.query('SELECT * FROM pmsweekly',(err,rows)=>{
                connection.release()

                // console.log(rows)
                
                const data = {
                    'monday': (rows[0].days==='monday') ? Number(rows[0].hhc) + Number(rows[0].public) : '0',
                    'tuesday': (rows[1].days==='tuesday') ? Number(rows[1].hhc)  + Number(rows[1].public) : '0',
                    'wednesday': (rows[2].days==='wednesday') ? Number(rows[2].hhc) + Number(rows[2].public) : '0',
                    'thursday': (rows[3].days==='thursday') ? Number(rows[3].hhc) + Number(rows[3].public) : '0',
                    'friday': (rows[4].days==='friday') ? Number(rows[4].hhc)  + Number(rows[4].public) : '0',
                    'saturday': (rows[5].days==='saturday') ? Number(rows[5].hhc)  + Number(rows[5].public) : '0',
                    'sunday': (rows[6].days==='sunday') ? Number(rows[6].hhc)  + Number(rows[6].public) : '0'
                }

                
                return res.json(data)
            })
        }
    })
}




