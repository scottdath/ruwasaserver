import fetch from 'node-fetch'
import {data} from '../index.js'
import dotenv from 'dotenv'

dotenv.config()

const URL_RUWASA = process.env.RUWASAURL

export const pdweeklyfetch = async() =>
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
                connection.release() 
                if (!err) {
                     let n = 50;  // replace with num_of_messages var
                      while(n >= 0){
                        let result = dat[ n ]
                        let message = result.msg 
                        let recv_time = result.dt
                        let in_msg = message.toLowerCase()
                        let full_list = in_msg.split( '#' )
                        let data_length = full_list.length
                        let messageid = result.id
                        // console.log(full_list) 
                        if (data_length > 5) {
                         
                          const metertype = full_list[0]
                          
                        if(metertype==='@ruwasapd'){
                            // console.log(full_list) 
                            const metertyp = full_list[0]
                            const messageno = full_list[2]
                            const meterid = full_list[1]
                            const userid = full_list[3]
                            const reportdate = full_list[4] 
                            const reporttime = full_list[5]
                            const litres = full_list[6]
                            const meterno = result.src

                          
                            const memoryaddress =  full_list[7]
                            let temp = full_list[8].split(':')[1]
                            const ltres = litres.split('\n')[0]

                            if (temp=='0'){
                              temp = "off"
                            }else if (temp=='1'){
                              temp='on'
                            }else if((Number(ltres))<0){
                              ltres = 0;
                            }


                            connection.query('SELECT * from pmsweekly', (err, rows) => {
                                connection.release() 
                                if (rows.length > 0){
                                   let pd = Number(rows[0].public) + Number(ltres)
  
                                  //  console.log(hhc)
                                    
                                    if(day==='monday'){
                                      const  q = "UPDATE pmsweekly SET public = ?  WHERE days = ?"
                                        connection.query( q, [String(pd),day], (err, rows) => {})
                                    }else if(day==='tuesday'){
                                      const q = "UPDATE pmsweekly SET public = ?  WHERE days = ?"
                                        connection.query( q, [String(pd),day], (err, rows) => {})
                                    }else if(day==='wednesday'){
                                      const q = "UPDATE pmsweekly SET public = ?  WHERE days = ?"
                                        connection.query( q, [String(pd),day], (err, rows) => {})
                                    }else if(day==='thursday'){
                                      const q = "UPDATE pmsweekly SET public = ?  WHERE days = ?"
                                        connection.query( q, [String(pd),day], (err, rows) => {})
                                    }else if(day==='friday'){
                                      const q = "UPDATE pmsweekly SET public = ?  WHERE days = ?"
                                        connection.query( q, [String(pd),day], (err, rows) => {})
                                    }else if(day==='sartuday'){
                                      const  q = "UPDATE pmsweekly SET public = ?  WHERE days = ?"
                                        connection.query( q, [String(pd),day], (err, rows) => {})
                                    }else if(day==='sunday'){
                                      const  q = "UPDATE pmsweekly SET public = ?  WHERE days = ?"
                                        connection.query( q, [String(pd),day], (err, rows) => {})
                                    }
  
                                  }else{
                                                                      
                                    if(day==='monday'){
                                        const  q = "UPDATE pmsweekly SET public = ?  WHERE days = ?"
                                          connection.query( q, [String(ltres),day], (err, rows) => {})
                                      }else if(day==='tuesday'){
                                        const q = "UPDATE pmsweekly SET public = ?  WHERE days = ?"
                                          connection.query( q, [String(ltres),day], (err, rows) => {})
                                      }else if(day==='wednesday'){
                                        const q = "UPDATE pmsweekly SET public = ?  WHERE days = ?"
                                          connection.query( q, [String(ltres),day], (err, rows) => {})
                                      }else if(day==='thursday'){
                                        const q = "UPDATE pmsweekly SET public = ?  WHERE days = ?"
                                          connection.query( q, [String(ltres),day], (err, rows) => {})
                                      }else if(day==='friday'){
                                        const q = "UPDATE pmsweekly SET public = ?  WHERE days = ?"
                                          connection.query( q, [String(ltres),day], (err, rows) => {})
                                      }else if(day==='sartuday'){
                                        const  q = "UPDATE pmsweekly SET public = ?  WHERE days = ?"
                                          connection.query( q, [String(ltres),day], (err, rows) => {})
                                      }else if(day==='sunday'){
                                        const  q = "UPDATE pmsweekly SET public = ?  WHERE days = ?"
                                          connection.query( q, [String(ltres),day], (err, rows) => {})
                                      }
    
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
