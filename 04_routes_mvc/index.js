const express = require("express");
const path = require("path")
const errorHandler =require("./src/middlewares/errorHandler")

const app = express();
const port = 8000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "src", "views"))

// to hander urlencoded data/ form data
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))


app.get("^/$|/index(.html)?", (req, res)=>{
    res.sendFile(path.join(__dirname, "src","views", "index.html"))
})
app.use("/user", require("./src/routes/user"))

app.all("*", (req, res)=>{
    res.status(404);
    if (req.accepts("html")) {
        return res.sendFile(path.join(__dirname, "src","views", "404-not-found.html"));
    }else if(req.accepts("json")){
        return res.json({
            error: "404 page not found"
        });
    }else{
        return res.type("text").send("404 page not found");
    }
    
})

app.use(errorHandler)


app.listen(port, ()=>{
    console.log("server started")
})