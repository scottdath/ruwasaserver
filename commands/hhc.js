import fetch from 'node-fetch'
import {data} from '../index.js'
import dotenv from 'dotenv'
import date from 'date-and-time';


dotenv.config()

const URL_RUWASA = process.env.RUWASAURL

const now = new Date();
console.log((date.format(now, 'dddd')).toLowerCase())

export const homecommandFetch = async() =>
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
                      if (data_length ===3 ){
                          const metertype = (full_list[0]).toLowerCase()

                          if (metertype==='@ruwasahhc'){
                                                     
                            const meterno = result.src

                            const ids = full_list[1].toLowerCase()
                                const datas = full_list[2]
                                const full = datas.split(':')

                                let name = full[0].toLowerCase()
                                let value = full[1]

                                if (name=="status"){
                                    let stat = ''
                                    if (value=='1'){
                                        stat = 'Online'
                                        const q = "UPDATE hhcmessages SET status = ? WHERE meterno = ?"

                                        data.query(q,[stat,ids],(err,data)=>{
                                            if (err) return res.json(`${(ids).toUpperCase()} - Status: ${stat}`)
                                        })
                                    }else{
                                        stat = 'Offline'
                                        const q = "UPDATE hhcmessages SET status = ? WHERE meterno = ?"

                                        data.query(q,[stat,ids],(err,data)=>{
                                          if (err) return res.json(`${(ids).toUpperCase()} - Status: ${stat}`)
                                      })
                                    }
                                    console.log("status: ",stat)
                                    

                                }
                                else if (name=="usr"){
                                    let stat = ''
                                    if (value=='1'){
                                        stat = 'Registered'
                                        const q = "UPDATE hhcmessages SET regstatus = ? WHERE meterno = ?"

                                        data.query(q,[stat,ids],(err,data)=>{
                                          if (err) return res.json(`${(ids).toUpperCase()} - Status: ${stat}`)
                                      })
                                    }else{
                                        stat = 'Unknown Meter'
                                        const q = "UPDATE hhcmessages SET regstatus = ? WHERE meterno = ?"

                                        data.query(q,[stat,ids],(err,data)=>{
                                          if (err) return res.json(`${(ids).toUpperCase()} - Status: ${stat}`)
                                      })
                                    }
                                    console.log("reg: ",stat)
                                    
                                }
                                else if (name=="reset"){
                                    let stat = ''
                                    if (value=='1'){
                                        stat = 'Reset!'
                                        const q = "UPDATE hhcmessages SET resetstatus = ? WHERE meterno = ?"

                                        data.query(q,[stat,ids],(err,data)=>{
                                          if (err) return res.json(`${(ids).toUpperCase()} - Status: ${stat}`)
                                      })
                                    }else{
                                        stat = 'Not reset!'
                                        const q = "UPDATE hhcmessages SET resetstatus = ? WHERE meterno = ?"

                                        data.query(q,[stat,ids],(err,data)=>{
                                          if (err) return res.json(`${(ids).toUpperCase()} - Status: ${stat}`)
                                      })
                                    }
                                    console.log("rest: ",stat)
                                    
                                }
                                else if (name=="clear"){
                                    let stat = ''
                                    if (value=='1'){
                                        stat = 'Memory Cleared!'
                                        const q = "UPDATE hhcmessages SET clearstatus = ? WHERE meterno = ?"

                                        data.query(q,[stat,ids],(err,data)=>{
                                          if (err) return res.json(`${(ids).toUpperCase()} - Status: ${stat}`)
                                      })
                                    }else{
                                        stat = 'Memory clear failed!'
                                        const q = "UPDATE hhcmessages SET clearstatus = ? WHERE meterno = ?"

                                        data.query(q,[stat,ids],(err,data)=>{
                                          if (err) return res.json(`${(ids).toUpperCase()} - Status: ${stat}`)
                                      })
                                    }
                                    console.log("clear: ",stat)
                                    
                                }
                                else if (name=="value"){
                                    console.log("value: ",value)
                                    const q = "UPDATE hhcmessages SET litres = ? WHERE meterno = ?"

                                        data.query(q,[value,ids],(err,data)=>{
                                          if (err) return res.json(`${(ids).toUpperCase()} - Status: ${stat}`)
                                      })
                                   

                                }


                            
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
