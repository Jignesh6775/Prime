const express = require("express")
const {connection} = require("./db")
require("dotenv").config() 
const {userRouter} = require("./routes/user.routes")
const {noteRouter} = require("./routes/note.routes")
const {auth} = require("./middleware/auth.middleware")
const swaggerJSdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const cors=require("cors")
const app = express()

app.use(express.json())
app.use(cors())

//definition
const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Learning Swagger",
            version:"1.0.0"
        },
        servers:[
            {
                url:"http://localhost:8080"
            }
        ]
    },
    apis:["./Routes/*.js"]
}
//specification
const swaggerSpec= swaggerJSdoc(options)
//building UI
app.use("/documentation",swaggerUI.serve,swaggerUI.setup(swaggerSpec))

app.use("/users", userRouter)

app.use(auth)
app.use("/notes", noteRouter)

app.listen(8080, async()=>{
    try {
        await connection
        // connection.disconnect
        console.log("Connected to Mongo")
    } catch (err) {
        console.log("Not connected to Mongo")
        console.log(err)
    }
    console.log('Server is running')
})