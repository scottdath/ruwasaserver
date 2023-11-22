import multer from "multer";
import express, { response } from 'express'
import bodyParser from 'body-parser'
import mysql from 'mysql2'
import cookieParser from "cookie-parser";
import cors from 'cors'
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
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD','DELETE'],
    credentials: true
  }));


app.get("/test",(req,res)=>{di
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
