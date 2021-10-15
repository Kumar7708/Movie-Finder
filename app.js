const express = require('express');
const path = require('path');
const request = require('request');
const app = express();
const PORT = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/results", (req, res) => {

    let query = req.query.search;
    request("https://api.themoviedb.org/3/search/movie?api_key=af9588914bba3497e2651fb13ce840a7&query=" + query, (error, response, body) => {
        if (error) {
            console.log(error);
        }
        let data = JSON.parse(body);
        res.render("movies", { data: data, query: query });
    });

});

app.get("/search", (req, res) => {
    res.render("search");
})

app.listen(PORT, () => {
    console.log("Server started at port 3000");
})