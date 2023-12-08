require("dotenv").config();//dotenv is nodemodule, with this we can use variables which is inside .env file,
// anywhere within this directory, by using

const express=require("express");//

const mongoose = require('mongoose');

const mongoString=process.env.DATABASE_URL;


mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app=express();
app.use(express.json());

app.listen(3001,()=>{
    console.log(`server started at port number ${3001}`);
});

const routes=require("./routes/routes");
app.use("/api",routes);

const routes2=require("./routes/routes2");
app.use("/api2",routes2);




