const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const MenuItem = require('./../models/MenuItem');

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log("Menu Item data saved successfully");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Menu item data fetched successfully");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get('/:tasteType',async (req,res)=>{
    try{
        const tasteType = req.params.tasteType;
        if(tasteType=='sweet' || tasteType=='spicy' || tasteType=='sour'){
            const response = await MenuItem.find({taste:tasteType});
            console.log('Data fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:'Invalid taste type'});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'Internal server error'});
    }
})

router.put('/:id',async (req,res)=>{
    try{
        const menuId = req.params.id;
        const updatedMenuInfo = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuId,updatedMenuInfo,{
            new:true,
            runValidators:true,
        });

        if(!response){
            return res.status(404).json({error:'Dish not found'});
        }

        console.log('Dish updated');
        res.status(200).json(response);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'Internal server error'});
    }
})

router.delete('/:id',async (req,res)=>{
    try{
        const menuId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuId);

        if(!response){
            return res.status(404).json({error:'Dish not found'});
        }

        console.log('Dish deleted');
        res.status(200).json(response);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'Internal server error'});
    }
})

// export
module.exports = router;