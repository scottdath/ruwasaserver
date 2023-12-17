import {data} from '../../index.js';

export const getallData =(req,res)=>{
    data.getConnection((err,connection)=>{
        if (!err){
            connection.query('SELECT * FROM pmsweekly',(err,rows)=>{
                connection.release()

                function calculateValueForDay(day) {
                    if (rows[0]?.days === day && rows[0]?.hhc && rows[0]?.zonal && rows[0]?.public) {
                        return Number(rows[0]?.hhc) + Number(rows[0]?.zonal) + Number(rows[0]?.public);
                    } else {
                        return 0;
                    }
                }
                
                const data = {
                    'monday': calculateValueForDay('monday'),
                    'tuesday': calculateValueForDay('tuesday'),
                    'wednesday': calculateValueForDay('wednesday'),
                    'thursday': calculateValueForDay('thursday'),
                    'friday': calculateValueForDay('friday'),
                    'saturday': calculateValueForDay('saturday'),
                    'sunday': calculateValueForDay('sunday')
                };

                
                return res.json(data)
            })
        }
    })
}




