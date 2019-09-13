/**
 *  ______   __                 __              __               _                  _       _______  _____  
 *|_   _ \ [  |               [  |  _         [  |             (_)                / \     |_   __ \|_   _| 
 *  | |_) | | |  .--.   .---.  | | / ]  .---.  | |--.   ,--.   __   _ .--.       / _ \      | |__) | | |   
 *  |  __'. | |/ .'`\ \/ /'`\] | '' <  / /'`\] | .-. | `'_\ : [  | [ `.-. |     / ___ \     |  ___/  | |   
 * _| |__) || || \__. || \__.  | |`\ \ | \__.  | | | | // | |, | |  | | | |   _/ /   \ \_  _| |_    _| |_  
 *|_______/[___]'.__.' '.___.'[__|  \_]'.___.'[___]|__]\'-;__/[___][___||__] |____| |____||_____|  |_____|
 * Built by: Fernando Martin Garcia Del Angel
 * Built on: September 12th, 2019                                                                                                        
 */
"use-strict"
 const express = require('express')
 const asyncHandler = require('express-async-handler')
 const query = require('./blockchain-functions/query')
 const invoke = require('./blockchain-functions/invoke')
 const enroll = require('./blockchain-functions/enrollAdmin')
 const user = require('./blockchain-functions/registerUser')
 const app = express()
 const port = 80

 app.use(express.json())

 /**
  * Online Set-up
  */
 app.post('/enroll',asyncHandler(async (req,res,next) => {
    const enan = await enroll.main()
    res.send(enan)
 }))

 app.post('/user',asyncHandler(async (req,res,next) => {
     const unan = await user.main()
     res.send(unan)
 }))

 app.post('/test',asyncHandler(async (req,res,next) => {
     const result = await invoke.testInvoke('user1')
     res.send(result)
 }))

 /**
  * Creates a new blood bag
  */
 app.post('/blood/create/:bagId/:bagOriginID/:bagLocation/:bloodType/:bloodRH/:size/:user', asyncHandler(async (req,res,next) =>{
    const received = req.params
    if(received.bagId == "" || received.bagOriginID == "" || received.bagLocation == "" || received.bloodType == "" || received.bloodRH == "" || received.size == "" || received.user == ""){
        res.sendStatus(500)
    }
    const result = await invoke.createBloodBag(received.bagId,received.bagOriginID,received.bagLocation,received.bloodType,received.bloodRH,received.size,received.user)
    console.log(result)
    res.sendStatus(200)
 }))

 /**
  * Reads blood bags
  */
 app.get('/blood/read/:bagId/:user',asyncHandler(async (req,res,next) => {
     const received = req.params
     if(received.bagId == "" || received.user == "") {
        res.sendStatus(500)
     }
     const result = await query.readBloodBag(received.bagId,received.user)
     res.send(result)
 }))

 /**
  * Gets transaction history for a Blood Bag
  */
 app.get('/blood/history/:bagId/:user',asyncHandler(async (req,res,next) => {
    const received = req.params
    if(received.bagId == "" || received.user == "") {
       res.sendStatus(500)
    }
    const result = await query.getHistoryForBloodBag(received.bagId,received.user)
    res.send(result)
}))

/**
 * Moves a bag to a new location
 */
app.post('/blood/move/:bagId/:location/:user',asyncHandler(async (req,res,next) => {
    const received = req.params
    if(received.bagId == "" || received.location == "" || received.user == ""){
        res.sendStatus(500)
    }
    const result = await query.moveBagToLocation(received.bagId,received.location,received.user)
    res.send(result)
}))

app.listen(port,()=>console.log(`Blockchain API listening on port ${port}!`))