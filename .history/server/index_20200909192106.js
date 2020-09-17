const keys=require("./keys")
const express=require("express")
const {Pool}=require("pg")
const redis=require("redis")
const cors=require("cors")
const bodyParser=require("body-parser")

const app=express()

app.use(cors())
app.use(bodyParser.json())

const pgClient=new Pool({
    "host":keys.pgHost,
    "port":keys.pgPort,
    "database":keys.pgDatabase,
    "user":keys.pgUser,
    "password":keys.pgPassword
})

pgClient.on("error",()=>console.log("Error in PG"))

pgClient.query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch((error)=>console.log(error))
    
//set up Redis
const redisClient = redis.createClient({
    host:keys.redisHost,
    port:keys.redisPort,
    retry_strategy:()=>1000
})    

