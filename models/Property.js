const mongoose = require('mongoose');
const propertySchema =  mongoose.Schema({
    propertyName:{
        required:true,
        type:String
    },
    propertyDescription:{
        required:true,
        type: String
    },
    propertyType:{
        type: String
    },
    yearOfBuild:{
        type: String
    },
    amenities:[{type: String}],
    propertyManager:{
        type: String
    },
    propertyOwner:{
        type: String
    },
    streetAddress:{
        type: String
    },
    district:{
        type: String
    },
    city:{
        type: String
    }
})
const Property = mongoose.model('Property', propertySchema);
module.exports = Property;