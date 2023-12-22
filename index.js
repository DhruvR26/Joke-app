import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));


app.get("/", (req, res)=>{
    res.render("home.ejs")
})


app.post("/safe", async(req, res)=>{
    try {
        const result = await axios.get("https://v2.jokeapi.dev/joke/Any?safe-mode");
        res.render("index.ejs", {joke:result.data.joke, setup : result.data.setup, delivery : result.data.delivery });
    } catch (error){
        console.error("Failed to make request: " +error.message);
        res.render("index.ejs", { error : "No Joke Found"})
        console.log(error.message)
    }
})

app.post("/nsfw", async(req, res)=>{
    try {
        const result = await axios.get("https://v2.jokeapi.dev/joke/Any?nsfw");
        res.render("index.ejs", {joke:result.data.joke, setup : result.data.setup, delivery : result.data.delivery });
    } catch (error){
        console.error("Failed to make request: " +error.message);
        res.render("index.ejs", { error : "No Joke Found"})
        console.log(error.message)
    }
})


app.listen(port, ()=> {
    console.log(`Server started on: ${port}`);
})