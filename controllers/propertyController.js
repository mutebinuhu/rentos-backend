const express = require("express");
const  Property = require("../models/Property");
const  {body, validationResult} = require('express-validator');
const Router = express.Router();
//get all docs
Router.get('/', async (req, res)=>{
    try {
        const allProperty = await Property.find();
        res.status(200).json({
            data: allProperty
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            error: "server error"
        })
    }
   
});
//add property
Router.post('/',[
body('propertyName', 'Property name is required').not().isEmpty(),
body('propertyDescription', 'Property Description is required').not().isEmpty(),
body('propertyOwner', 'Property Owner is required').not().isEmpty(),



],  async (req, res)=>{
    const {propertyName, propertyDescription,propertyType, 
        yearOfBuild, amenities,propertyOwner,
         propertyManager, streetAddress, district, city
         } = req.body
         
         const listForAmenities = [];
         try {
             if(amenities){
                 const amenitiesList = amenities.split(",")
                amenitiesList.map(item=>listForAmenities.push(item))
             }
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(500).json({errors: errors.array()})
            }
             const property = new Property({
                propertyName, propertyDescription,propertyType, 
                yearOfBuild, amenities:listForAmenities,propertyOwner,
                propertyManager, streetAddress, district, city 
             });
            await property.save();
            res.status(200).json({
                data:property
            })
           
         } catch (error) {
             res.status(500);
             console.log(error.message)
         }
   
});
//get a single property
Router.get('/:id', async(req, res)=>{
    try {
        const property = await Property.findById(req.params.id);
        if(!property){
            return res.status(404).json({msg: "Property not found"});
        }
        res.status(200).json({data: property})
    } catch (error) {
        console.log(error.message)
        if(error.kind = 'ObjectId'){
            return res.status(404).json({msg: "Property not found"});
        }
        res.status(500).json({msg: "server Error "})
    }
});

//update a single property
Router.put('/:id', async(req, res)=>{
    try {
        const property = await Property.findById(req.params.id);
        if(!property){
            return res.status(404).json({msg: ""})
        }
       
        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!updatedProperty){
            res.status(404).json({data: "not updated"})
        }
        res.status(201).json({
            data: updatedProperty
        })
    } catch (error) {
        console.log(error.message)
        if(error.kind=='ObjectId'){
            return res.status(404).json({msg: "Property not found"});
        }
    }
});
//delete a single property
Router.delete('/:id', async(req,res)=>{
    try {
         const property = await Property.findById(req.params.id);
         if(!property){
             return res.status(400).json({msg: "no propery found"})
         } 
         const deleteProperty = await Property.findByIdAndRemove(property)
         if(deleteProperty){
             res.status(200).json({msg: "property deleted"});
         }
    } catch (error) {
        console.log(error.message)
        if(error.kind == 'ObjectId'){
            res.status(400).json({msg: "no propery found"})

        }
    }
})
module.exports = Router;