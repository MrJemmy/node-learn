const express = require("express");
const path = require("path")
const cors = require("cors")

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
app.use(express.static(path.join(__dirname, "public")))
app.use((req, res, next)=>{
    console.log("=== middleware ===")
    console.log("req.method : ", req.method)
    console.log("req.path : ", req.path)
    next()
})
app.use((err, req, res, next)=>{
    console.error(err);
    res.status(500).send(err.message)
})

app.get("^/$|/index(.html)?", (req, res)=>{

    console.log(req.body)

    res.sendFile(path.join(__dirname, "src","views", "index.html"))
})

app.get("/*", (req, res)=>{
    res.status(404).sendFile(path.join(__dirname, "src","views", "404-not-found.html"))
})


app.listen(port, ()=>{
    console.log("server started")
})