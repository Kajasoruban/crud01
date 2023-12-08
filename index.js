require("dotenv").config();//dotenv is nodemodule, with this we can use variables which is inside .env file,
// anywhere within this directory.With this dotenv configuration ,process.env will get  key value pairs which
//is inside .env file

const express=require("express");/*express is web application framework with this we can easily handle routes,
middleware,debugging
*/
const mongoose = require('mongoose');/*mongoose is a mongodb library which help us to connect database and help us
to access the data base*/

const mongoString=process.env.DATABASE_URL;/*here we are assigning our mongostring which is needed for  connecting 
to database by using process.env and our variable name which we specified in .env file for connection
string
*/


mongoose.connect(mongoString);/*we our using our mongostring variable to connect to database */
const database = mongoose.connection;/*we are assigning that connection to a variable */
database.on('error', (error) => {
    console.log(error)
})
/*we are make it listen to that connection and if any error occur evoke a function which will console 
error which we got when connecting*/


database.once('connected', () => {
    console.log('Database Connected');
})
/*here we are make to listen to connection and once connection is succes console log will happen with the 
messege we specified in that anonymous function */


const app=express();/*we are connecting express application to a variable named app */
app.use(express.json());/*by using use method of express to use express.json middleware which is 
help us to  parse json request and store it to req.body*/

app.listen(3001,()=>{
    console.log(`server started at port number ${3001}`);
});
/*tell to start the server in specified port and if it success consolelog the messege we specified */

const routes=require("./routes/routes");/*we are importing our routerfile from ./routes/routes path */
app.use("/api",routes);/*we are using common end point of routes as /api. so other endpoints we are getting 
from routes will be prefix with /api .then we can use enpoints and request in routes file here and 
send requests*/

const routes2=require("./routes/routes2");
app.use("/api2",routes2);




