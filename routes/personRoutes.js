const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const {generateToken,jwtAuthMiddleware} = require('../jwt');

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("Data saved successfully");

    const payload = {
      id : response.id,
      username : response.username,
    }
    console.log("Payload is : ",JSON.stringify(payload));

    const token = generateToken(payload);
    console.log("Token is : ",token);

    res.status(200).json({response:response,token:token});
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/login',async (req,res) =>{
  try{
    const {username,password} = req.body;
  const user = await Person.findOne({username : username});

  if(!user || !(await user.comparePassword(password))){
    return res.status(401).json({message : 'Invalid username or password'});
  }

  const payload = {
    id: user.id,
    username : user.username,
  }
  const token = generateToken(payload);
  res.json({token});

  }

  catch(error){
    console.log(error);
    res.status(500).json({error:'Internal server error'});
  }
})


router.get("/", jwtAuthMiddleware , async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data fetched successfully");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get('/profile',jwtAuthMiddleware,async (req,res) => {
  try{
    const userData = req.user;
    console.log("User data : ",userData);

    const userId = userData.id;
    const user = await Person.findById(userId);

    res.status(200).json({user});
  }
  catch(error){
    console.log(error);
    res.status(500).json({error:'Internal server error'});
  }
})

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "manager" || workType == "chef" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("Response fetched");
      res.status(200).json(response);
    }
    else{
        res.status(404).json('Invalid work type')
    }
  } catch (error) {
    res.status(500).json({ error: "Innternal server error" });
  }
});

router.put('/:id',async(req,res)=>{
    try{
        const personId = req.params.id;
        const updatedePersonInfo = req.body;

        const response = await Person.findByIdAndUpdate(personId,updatedePersonInfo,{
            new: true,
            runValidators: true,
        })

        if(!response){
            return res.status(404).json({error:'Person not found'});
        }

        console.log('Data updated successfully');
        res.status(200).json(response);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'Internal server error'});
    }
});

router.delete('/:id',async (req,res)=>{
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json('Person not found');
        }
        console.log('Data deleted');
        res.status(200).json(response);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'Internal server error'});
    }
})

module.exports = router;