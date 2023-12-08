
const express = require("express");
const router = express.Router();/*with express.Router() we can create create new router object of express and 
we can use it to handle requests. it can handle multiple requests easily*/

const Model = require("../models/model");/*we are importing mongoose model we created in model file 
which is in models folder */




//Get by form Method
// router.get('/form', (req, res) => {
//     res.sendFile(__dirname+"/index.html")
// });

// router.post("/formdata",(req,res)=>{
    
//     res.send(req.body);
// })



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
/* */




//getall from database collection
router.get("/getAll", async(req,res)=>{
    try{
        const data= await Model.find();
        res.json(data);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

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



module.exports=router;/*exporting our routes which is inside router */