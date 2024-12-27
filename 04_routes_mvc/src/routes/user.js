const express = require("express")


const route = express.Router()


route.route("/")
    .get((req, res) => {
        res.render("user-list.ejs")
    })
    .post((req, res) => {
        res.send("user/post")
    })

route.route("/:id")
    .get((req, res) => {
        res.send(`user/get/${req.params.id}`)
    })
    .put((req, res) => {
        res.send(`user/put/${req.params.id}`)
    })
    .delete((req, res) => {
        res.send(`user/delete/${req.params.id}`)
    })

module.exports = route;