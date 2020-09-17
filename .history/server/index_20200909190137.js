const keys=require("./keys")
const express=require("express")
const pg=require("pg")
const redis=require("redis")
const cors=require("cors")
const bodyParser=require("body-parser")

const app=express()

app.use(cors())
app.use(bodyParser.json())