const path = require('path');
const express = require("express");
const port = process.env.PORT || 3000;

const app = express();

//Defined paths for express config, express will find these paths
const publicDirectory = path.join(__dirname, "../public")
const viewsDir = path.join(__dirname, "../templates/views")

//Setup handlebars and new views location
app.set("view engine", 'hbs');
app.set("views", viewsDir);

// served static files on server
app.use(express.static(publicDirectory))

app.get("", (req, res) => {
    res.render('index', { title: 'weather App', name: 'Rohit' })
})
app.get("/about-us", (req, res) => {
    res.render('about', { title: 'About Us!', name: 'Rohit' })
})
app.get("/help", (req, res) => {
    res.render('help', { title: 'We help!', name: 'Rohit' })
})

// app.get("/", (req, res) => { res.send("Hello Express!!") });

app.get("/weather", (req, res) => {
    res.send([{
        forecast: "clear",
        Longitude: "30",
        latitude: "80",
        location: "Tejli"
    }]);
})
app.listen(port, () => {
    console.log("Server is up and  kicking @" + port);
});