const { response } = require('express')
const express =require('express')
//const appConst =require('../router/constants')
const fetch = require('node-fetch')
const Redis = require('redis')
const redis_port = process.env.REDIS_PORT || 6397
const client = Redis.createClient(redis_port)
// set Response
function setResponse(username,repos){
    return `<h2>${username} has ${repos} Github Repos</h2>`

}
const getRepos = async(req,res)=>{
    try {
        console.log('Fetching data...!!')
        const { username } =req.params
        const resp =await fetch(`https://api.github.com/users/${username}`)
        const data =await resp.json()
        res.send(data)
    //    const repos =data.public_repos
    //     // set data to Redis
    //    client.set(username,3600 ,repos)
    //     res.send(setResponse(username,repos))
        
        
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            status:'fail',
            response:null,
            message:"failed to fetch the data into the cache!..."
        })
        
    }
}

// Cache middleware

const cache=async(req,res,next)=>{
    const {username} =req.params
    client.get(username,(error,data)=>{
        if(error) throw error

        if(data!==null){
            res.send(setResponse(username,data))
        }
        else{
            next()
        }

    }
    )
    
        
    }

module.exports ={getRepos,cache}