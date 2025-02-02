const express = require("express");
const path = require("path")
const cors = require("cors");
const errorHandler =require("./src/middlewares/errorHandler")

const app = express();
const port = 8000;


const whileList = ["http://www.react-frontend.domain", "http://localhost:5173/"]
const corsOptions = {
    origin: (origin, cb) =>{
        if (whileList.indexOf(origin) != -1 || !origin) {
            // when we use localhost then value of origin us undefile then add condition :- !origin
            cb(null, true)
        }else{
            cb(new Error("not allowed by cors"))
        }
    },
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))
// to hander urlencoded data/ form data
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// other then `/`  this route will not be accepted public asper below config
app.use(express.static(path.join(__dirname, "public")))
// so to acess this public anyware, specify route or specify /*
// app.use("/*", express.static(path.join(__dirname, "public")))
app.use((req, res, next)=>{
    console.log("=== middleware ===")
    console.log("req.method : ", req.method)
    console.log("req.path : ", req.path)
    next()
})


app.get("^/$|/index(.html)?", (req, res)=>{

    console.log(req.body)

    res.sendFile(path.join(__dirname, "src","views", "index.html"))
})

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