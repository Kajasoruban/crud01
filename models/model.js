const mongoose = require('mongoose');/*we need to access mongoose library so we importing it here */

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    }
});
/*we are creating new schema for our documents which we will store in database. here we use properties 
and value required or not and type of it */

module.exports = mongoose.model('Data', dataSchema);/*we are creating a mongoose model based on dataschema
we created to collection named data and  exporting it */