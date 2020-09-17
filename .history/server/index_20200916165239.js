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

    pgClient.on('connect', () => {
        pgClient
          .query('CREATE TABLE IF NOT EXISTS vls (number INT)')
          .catch((err) => console.log(err));
      });    
    
//set up Redis
const redisClient = redis.createClient({
    host:keys.redisHost,
    port:keys.redisPort,
    retry_strategy:()=>1000
})  

const redisPublisher = redisClient.duplicate()

//routes

app.get("/",(req,res)=>{
    res.send("hello")
})

app.get("/values/all", async(req, res)=>{
    const values=await pgClient.query("SELECT * FROM vls")
        .catch((error)=>{
            console.log(error)
        })
    res.send(values.rows)
})

app.get("/values/current", async(req, res)=>{
    const values=redisClient.hgetall("values",(err,values)=>{
        res.send(values)
    })
})

app.post("/values", async(req, res)=>{
    const index=req.body.index

    if(parseInt(index) > 30)
        res.status(422).send("Index too high!")

    redisClient.hset("values",index,"Nothing yet")
    redisPublisher.publish("insert",index)
    
    pgClient.query("INSERT INTO vls VALUES($1)",[index])

    res.send({working:true})

})

app.listen(5000,(err)=>{
    console.log("Listening on 5000")
})