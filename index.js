var express = require("express")
var mongoose = require("mongoose")
var bodyParser=require("body-parser")


const app=express()
app.use(bodyParser.json())
app.use(express.static("public"))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://localhost:27017/MoneyList')
var db=mongoose.connection
db.on('error', ()=> console.log("Error in connecting to the Database"))
db.once('open', () => console.log("Connected to Database"))
app.post("/add", (req,res) =>{
    var category_select = req.body.category_select
    var amount_input = req.body.amount_input
    var info = req.body.info
    var date_input = req.body.date_input

    var data={
        "Category" : category_select,
        "Amount" : amount_input,
        "Info" :info,
        "Date" :date_input
    }
    db.connection('users').insertOne(data, (err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully")
    })
})


app.get("/",(_req,res) => {
res.set({
    "Allow-access-Allow-Origin":'*'
})
return res.redirect('C:/Users/dell/Desktop/money tracker app/public/index.html')
}).listen(5000)

console.log("Listening on port 5000")