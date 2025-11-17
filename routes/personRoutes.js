const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log("Data saved successfully");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data fetched successfully");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


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