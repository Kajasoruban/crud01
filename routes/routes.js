
const express = require("express");
const router = express.Router();/*with express.Router() we can create create new router object of express and 
we can use it to handle requests. it can handle multiple requests easily*/

const Model = require("../models/model");/*we are importing mongoose model we created in model file 
which is in models folder */




//Get by form Method
router.get('/form', (req, res) => {
    res.sendFile(__dirname+"/index.html")
});

router.post("/formdata",async(req,res)=>{
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })
    try{
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})



//Post using Model
router.post('/post', async(req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })
    try{
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
});
/* here we are setting up a http post request in /post path using router which is express.
then we using async keyword to make this function assynchnorus and so it going to happen in paralel
not going to wait for other previous functions to be finished.
then we are creating new Model (schema we created to data collection) and store properties
with req.body.name that parsed by the express.json and
then we using try and catch method to error handling which is codes in try will be exucute
but if any error happens it will be get catch and then error messege will be passed on to the json
of response which will change it in json format and then it will throw throw error in json format.
In try block we are declaring a variable but we made this function as a assynchnorus(data.save()is
 going to store the data we created and return a promise which may take some time) so we use 
await key word to wait for returning and then declare.
*/


//getall from database collection
router.get("/getAll", async(req,res)=>{
    try{
        const data= await Model.find();
        res.json(data);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});
/*here we are using get method of router in path /getAll
and here we are using find method to return all the documents in collection data of database */

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
/*here we are usin http.get but here we are passing id and using that id inside findById method to
get document with that specific id */

// update by ID Method
router.patch("/update/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const updatedData=req.body;
        const options={new:true};

        const result= await Model.findByIdAndUpdate(
            id,updatedData,options
        )
        res.send(result);
    }catch(error){
        res.status(400).json({message:error.message});
    }
})

/*in here using http patch method with that path specified
then we are creating three variables which we will pass to findByIdAndUpdate()method 
id for which document and messege we need to update and option is true because we need to return
the updated document */

//Delete by ID Method

router.delete("/delete/:id", async(req,res)=>{
    try{
        const id=req.params.id;
        const data= await Model.findByIdAndDelete(id);
        res.send(`Document with ${data.name} has been deleted..`);
    }catch(error){
        res.status(400).json({message:error.message});
    }
} )
/*here we are using http delete method with specified path and then by using
findByIdAndDelete(id) we are deleting document with that id and 
in response we returning it's name by data.name with some messege
 */


module.exports=router;/*exporting our routes which is inside router */