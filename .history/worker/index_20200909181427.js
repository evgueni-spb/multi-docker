const keys=require("./keys")
const redis=require("redis")

const client = redis.createClient({
    host:keys.redisHost,
    port:keys.redisPort,
    retry_strategy:()=>1000
})

const sub=client.duplicate()

function fib(index){
    if(index < 3)
        return 1
    else
        return fib(index-2)+fib(index-1)
}