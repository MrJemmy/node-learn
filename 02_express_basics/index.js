const express = require("express");
const path = require("path");


const app = express();
const port = 8000;

app.get("^/$|/index(.html)?", (req, res)=>{
    // ^/ : must starts with /
    // /$ : must ends with / 
    // | : or
    // (.html)? : it will make .html optional
    res.sendFile(path.join(__dirname, "src","views", "index.html"))
})

app.get("/redirect", (req, res)=>{

    console.log("baseUrl :",req.baseUrl)
    console.log("url :",req.url)

    res.redirect(301, "/")
})

app.get("/*", (req, res)=>{

    console.log("baseUrl :",req.baseUrl)
    console.log("url :",req.url)

    res.status(404).sendFile(path.join(__dirname, "src","views", "404-not-found.html"))
})


app.listen(port, ()=>{
    console.log("server started")
})