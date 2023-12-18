import fetch from 'node-fetch'
import {data} from '../index.js'
import dotenv from 'dotenv'

dotenv.config()

const URL_RUWASA = "https://ruwasa-datamod.uk1.pitunnel.com//index.php?app=ws&u=admin&h=04d209b72f2c2982c462f592a3981408&op=sx&kwd=ruwasa&format=json"

export const pdcommandFetch = async() =>
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
                         if (data_length===3){
                          const ids = full_list[1].toUpperCase()
                          const datas = full_list[2]
                          const full = datas.split(':')

                          let name = full[0].toLowerCase()
                          let value = full[1]

                          if (name=="status"){
                              let stat = ''
                              if (value=='1'){
                                  stat = 'Online'
                                  const q = "UPDATE pdmeters SET status = ? WHERE meterno = ?"

                                        data.query(q,[stat,ids],(err,data)=>{
                                          if (err) return res.json(`${(ids).toUpperCase()} - Status: ${stat}`)
                                      })
                              }else{
                                  stat = 'Offline'
                                  const q = "UPDATE pdmeters SET status = ? WHERE meterno = ?"

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
                                  const q = "UPDATE pdmeters SET regstatus = ? WHERE meterno = ?"

                                        data.query(q,[stat,ids],(err,data)=>{
                                          if (err) return res.json(`${(ids).toUpperCase()} - Status: ${stat}`)
                                      })
                              }else{
                                  stat = 'Unknown Meter'
                                  const q = "UPDATE pdmeters SET regstatus = ? WHERE meterno = ?"

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
                                  const q = "UPDATE pdmeters SET resetstatus = ? WHERE meterno = ?"

                                        data.query(q,[stat,ids],(err,data)=>{
                                          if (err) return res.json(`${(ids).toUpperCase()} - Status: ${stat}`)
                                      })
                              }else{
                                  stat = 'Not reset!'
                                  const q = "UPDATE pdmeters SET resetstatus = ? WHERE meterno = ?"

                                        data.query(q,[stat,ids],(err,data)=>{
                                          if (err) return res.json(`${(ids).toUpperCase()} - Status: ${stat}`)
                                      })
                              }
                              
                          }
                          else if (name=="clear"){
                              let stat = ''
                              if (value=='1'){
                                  stat = 'Memory Cleared!'
                                  const q = "UPDATE pdmeters SET clearstatus = ? WHERE meterno = ?"

                                        data.query(q,[stat,ids],(err,data)=>{
                                          if (err) return res.json(`${(ids).toUpperCase()} - Status: ${stat}`)
                                      })
                              }else{
                                  stat = 'Memory clear failed!'
                                  const q = "UPDATE pdmeters SET clearstatus = ? WHERE meterno = ?"

                                        data.query(q,[stat,ids],(err,data)=>{
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
