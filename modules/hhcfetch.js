import fetch from 'node-fetch'
import {data} from '../index.js'
import dotenv from 'dotenv'
import date from 'date-and-time';


dotenv.config()

const URL_RUWASA = process.env.RUWASAURL

const now = new Date();
console.log((date.format(now, 'dddd')).toLowerCase())

export const hhcdataFetch = async() =>
{   
    await fetch(URL_RUWASA)
        .then( ( res ) => res.json()).then( ( json ) =>
        {  
          
          data.getConnection((err, connection) => {
            if(err) throw err
          connection.query( "SELECT * FROM messagenos  WHERE id = ?", [1], (err, rows) => {
            connection.release() 
            if (!err) {
             
              const previd = rows[0].previousid 
              const dat = json.data
              const last_sms = dat[0]
              const dat_len = Number(last_sms.id) - 1
              let num_of_message = dat_len - Number(previd) 
              // console.log(num_of_message)

             
                  
                // console.log(params)      
                connection.query( "UPDATE messagenos SET currentid = ?, previousid = ?  WHERE id = ?", [String(dat_len),String(dat_len),1], (err, rows) => {
                // connection.release() 
                if (!err) {
                     let n = 0;  // replace with num_of_messages var
                      for (n = 0; i<=num_of_message; i++){
                        let result = dat[ n ]
                        let message = result.msg 
                        let recv_time = result.dt
                        let in_msg = message.toLowerCase()
                        let full_list = in_msg.split( '#' )
                        let data_length = full_list.length
                        let messageid = result.id
                        console.log(full_list)  

                         if (data_length > 3) {
                         
                          const metertype = full_list[0]
                          
                          

                          if (metertype==='@ruwasahhc'){
                            // console.log(metertype)
                            const metertyp = full_list[0]
                            const address = full_list[2]
                            const meterid = full_list[1]
                            const reportdate = full_list[3]
                            const reporttime = full_list[4] 
                            const litres = full_list[5]
                            let temper = full_list[6]
                            const meterno = result.src

                            const ltres = litres.split('\n')[0]
                            // console.log(ltres)

                            if (temper=='0'){
                              temper = "off"
                            }else if (temper=='1'){
                              temper='on'
                            }else if((Number(ltres))<0){
                              ltres = 0;
                            }
                            
                            const q = "UPDATE hhcmessages SET reportdate = ?,reporttime = ?,litres = ?,messageno = ?,temper = ? WHERE meterno = ?"

                            data.query(q,[reportdate,reporttime,ltres,address,temper,meterid],(err,data)=>{
                                if (err) {
                                  // console.log(err)
                                }else{
                                  // console.log(" data updated successful!");
                                }
                                
                            })

                            connection.query('SELECT * from hhcmessages', (err, rows) => {
                              connection.release() 
                              if (rows.length > 0){
                                  //  const time = rows[0].reporttime.split(":")[0]
                                  //  const meterno = rows[0].meterno
                                  //  const consumptions = Number(rows[0].litres) - Number(ltres)
                  
                                  // //  console.log(Number(time))
                  
                                  //  if (time >= 19 ){
                                  //     const q = "UPDATE pmsdaily SET night = ? WHERE meterno = ?"
                  
                                  //             data.query(q,[consumptions, meterno],(err,data)=>{
                                  //                 if (err) {
                                  //                   // console.log(err)
                                  //                 }else{
                                  //                   // console.log(" data updated successful!");
                                  //                 }
                                                  
                                  //             })
                  
                                  //  }else if (time > 11 && time < 19){

                                  //   const q = "UPDATE pmsdaily SET evening = ? WHERE meterno = ?"
                  
                                  //             data.query(q,[consumptions, meterno],(err,data)=>{
                                  //                 if (err) {
                                  //                   // console.log(err)
                                  //                 }else{
                                  //                   // console.log(" data updated successful!");
                                  //                 }
                                                  
                                  //             })
                  
                                  //  }else if (time < 11 && time >= 4){

                                  //   const q = "UPDATE pmsdaily SET morning = ? WHERE meterno = ?"
                  
                                  //             data.query(q,[consumptions, meterno],(err,data)=>{
                                  //                 if (err) {
                                  //                   // console.log(err)
                                  //                 }else{
                                  //                   // console.log(" data updated successful!");
                                  //                 }
                                                  
                                  //             })
                  
                                  //  }else if (time < 4 ){

                                  //   const q = "UPDATE pmsdaily SET night = ? WHERE meterno = ?"
                  
                                  //             data.query(q,[consumptions, meterno],(err,data)=>{
                                  //                 if (err) {
                                  //                   // console.log(err)
                                  //                 }else{
                                  //                   // console.log(" data updated successful!");
                                  //                 }
                                                  
                                  //             })
                  
                                  //  }

                      
                                }
                                else{
                                  
                                }
                              if (!err) {
                                //  return res.status(200).json(rows)
                              } else {
                                  // return res.status(200).json("Error")
                              }
                      
                      
                          })
                          }                      
                          
                        }

                        
                        n--;
                      }
                      } else {
                          console.log(err)
                      }
                      
                  })


            } else {
                console.log("err")
            }
            })


            
          })
         

            
            
}).catch(err=>{
  console.log('')
})
          
}
