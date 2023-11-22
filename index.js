import multer from "multer";
import express, { response } from 'express'
import bodyParser from 'body-parser'
import mysql from 'mysql2'
import cookieParser from "cookie-parser";
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken' 
import dotenv from 'dotenv'
import authRoutes from './routes/auths.js'
import {hhcdataFetch} from './modules/hhcfetch.js'
import {pddataFetch} from './modules/pdfetch.js'
import {zndataFetch} from './modules/znfetch.js'
import hhcRoutes from './routes/hhcmeters.js'
import pdRoutes from './routes/pdmeters.js'
import znRoutes from './routes/znmeters.js'

import searchRoutes from './routes/search.js'
import {hhcweeklyfetch} from './weekly/hhcpms.js'
import {pdweeklyfetch} from './weekly/pdpms.js' 
import {znweeklyfetch} from './weekly/znpms.js'
import { homecommandFetch } from "./commands/hhc.js";
import { pdcommandFetch } from "./commands/public.js";
import { zncommandFetch } from "./commands/zonal.js";

import weeklyRoute from './routes/weekly.js'


const app = express()
let previousid = 0  

dotenv.config()

export const data = mysql.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    waitForConnections: true
});

process.on('uncaughtException', function (err) {
    console.log(err);
}); 

const PORT = process.env.PORT || 3001

app.use(express.urlencoded({extended: false}))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: 'https://ruwasasoft.netlify.app/',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD','DELETE'],
    credentials: true
  }));


app.get("/test",(req,res)=>{
    console.log("testing okey");
    return res.json("ruwasa database testing: okey");
})

app.use("/api/hhcpms",hhcRoutes)
app.use("/api/pdpms",pdRoutes)
app.use("/api/znpms",znRoutes)
app.use("/api/auths",authRoutes)
app.use("/api/weekly",weeklyRoute)
app.use("/api/dailypms",searchRoutes)


data.getConnection((err,connection)=>{
   if (err){ 
    console.log("Error while connecting to database!")
   }else{
    console.log("connected to database!")
   }
})





data.query(`CREATE TABLE IF NOT EXISTS hhcmessages (
    id INT(255) UNIQUE PRIMARY KEY AUTO_INCREMENT,
    metertype VARCHAR(255),
    reportdate VARCHAR(255),
    reporttime VARCHAR(255),
    litres VARCHAR(255),
    messageno VARCHAR(255),
    meterid VARCHAR(255),
    meterno VARCHAR(255),
    temper VARCHAR(255),
    username VARCHAR(255),
    userId VARCHAR(255),
    region VARCHAR(255),
    district VARCHAR(255),
    location VARCHAR(255),
    regionId VARCHAR(255),
    status VARCHAR(255),
    regdate VARCHAR(255),
    bill VARCHAR(255),
    regstatus VARCHAR(255),
    resetstatus VARCHAR(255),
    clearstatus VARCHAR(255)
  )`, (err, result) => {
    if (err) throw err;
  });

  data.query(`CREATE TABLE IF NOT EXISTS znmessages (
    id INT(255) UNIQUE PRIMARY KEY AUTO_INCREMENT,
    metertype VARCHAR(255),
    reportdate VARCHAR(255),
    reporttime VARCHAR(255),
    litres VARCHAR(255),
    messageno VARCHAR(255),
    meterid VARCHAR(255),
    meterno VARCHAR(255),
    temper VARCHAR(255),
    username VARCHAR(255),
    userId VARCHAR(255),
    region VARCHAR(255),
    district VARCHAR(255),
    location VARCHAR(255),
    regionId VARCHAR(255),
    status VARCHAR(255),
    regdate VARCHAR(255),
    bill VARCHAR(255),
    regstatus VARCHAR(255),
    resetstatus VARCHAR(255),
    clearstatus VARCHAR(255)
  )`, (err, result) => {
    if (err) throw err;
  });

  data.query(`CREATE TABLE IF NOT EXISTS pdmessages (
    id INT(255) UNIQUE PRIMARY KEY AUTO_INCREMENT,
    metertype VARCHAR(255),
    reportdate VARCHAR(255),
    reporttime VARCHAR(255),
    litres VARCHAR(255),
    address VARCHAR(255),
    meterid VARCHAR(255),
    meterno VARCHAR(255),
    temper VARCHAR(255),
    username VARCHAR(255),
    messageid VARCHAR(255),
    userid VARCHAR(255),
    messageno VARCHAR(255),
    region VARCHAR(255),
    location VARCHAR(255),
    regionid VARCHAR(255),
    regdate VARCHAR(255),
    bill VARCHAR(255)
  )`, (err, result) => {
    if (err) throw err;
  });

  data.query(`CREATE TABLE IF NOT EXISTS pdmeters (
    id INT(255) UNIQUE PRIMARY KEY AUTO_INCREMENT,
    metertype VARCHAR(255),
    meterid VARCHAR(255),
    meterno VARCHAR(255),
    region VARCHAR(255),
    district VARCHAR(255),
    regdate VARCHAR(255),
    status VARCHAR(255),
    location VARCHAR(255),
    consumption VARCHAR(255),
    temper VARCHAR(255),
    regionid VARCHAR(255),
    regstatus VARCHAR(255),
    resetstatus VARCHAR(255),
    clearstatus VARCHAR(255)
  )`, (err, result) => {
    if (err) throw err;
  });

  data.query(`CREATE TABLE IF NOT EXISTS pmsdaily (
    id INT(255) UNIQUE PRIMARY KEY AUTO_INCREMENT,
    meterno VARCHAR(255),
    morning VARCHAR(255),
    evening VARCHAR(255),
    night VARCHAR(255)
  )`, (err, result) => {
    if (err) throw err;
  });

  data.query(`CREATE TABLE IF NOT EXISTS pmsweekly (
    id INT(255) UNIQUE PRIMARY KEY AUTO_INCREMENT,
    days VARCHAR(255),
    hhc VARCHAR(255),
    public VARCHAR(255),
    zonal VARCHAR(255)
  )`, (err, result) => {
    if (err) throw err;
  });



  data.query(`CREATE TABLE IF NOT EXISTS users (
    id INT(255) UNIQUE PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255),
    password VARCHAR(255),
    reporttime VARCHAR(255)
  )`, (err, result) => {
    if (err) throw err;

    const q = "SELECT * FROM users WHERE username = ? ";
     data.query(q,['admin'],(err,datas)=>{
      if (err) return err;
      if (datas.length) return console.log('existing data')
  
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync('admin',salt)
  
  
      data.getConnection((err, connection) => {
          if(err) throw err
  
                  
          const params = {'username':'admin', 'password':hash};
      
          // console.log(params)
  
  
          
          connection.query('INSERT INTO users SET ?', params, (err, rows) => {
          connection.release() 
          if (!err) {
              
          } else {
              
          }
          
          })
  
        })
  
      })
  });

  

  



const online =()=>{
        console.log('online status')
        const url_to_customer = `https://ruwasa-scottackc1.uk1.pitunnel.com//index.php?app=ws&u=admin&h=04d209b72f2c2982c462f592a3981408&op=pv&to=+255742519823&msg=online`
        fetch( url_to_customer, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( data )
        } ).then( res => res.json() )
   
}

setInterval(hhcdataFetch,10000)
setInterval(pddataFetch,5000)
setInterval(zndataFetch,15000)
setInterval(hhcweeklyfetch,8000)
setInterval(pdweeklyfetch,20000)
setInterval(znweeklyfetch,30000)
setInterval(homecommandFetch,1400)
setInterval(zncommandFetch,1700)
setInterval(pdcommandFetch,11000)





app.listen(PORT,()=>{
  console.log('successfully connected to port: ',PORT)
})
