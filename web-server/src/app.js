const path = require('path');
const express = require("express");
const hbs = require("hbs");
const port = process.env.PORT || 3000;

const app = express();

//Defined paths for express config, express will find these paths
const publicDirectory = path.join(__dirname, "../public")
const viewsDir = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//Setup handlebars and new views location
app.set("view engine", 'hbs');
app.set("views", viewsDir);
hbs.registerPartials(partialsPath)

// served static files on server
app.use(express.static(publicDirectory))

app.get("", (req, res) => {
    res.render('index', { title: 'weather App', name: 'Rohit' })
})
app.get("/aboutus", (req, res) => {
    res.render('about', { title: 'About Us!', name: 'Rohit' })
})
app.get("/help", (req, res) => {
    res.render('help', { title: 'We help!', name: 'Rohit' })
})
app.get("/help/*", (req, res) => {
    res.render('404page', { errorMessage: 'Help Article Not Found!' })
})

// app.get("*", (req, res) => {
//     res.render("404page", { errorMessage: "404 Page Not Found!" })
// })

// app.get("/", (req, res) => { res.send("Hello Express!!") });

app.get("/weather", (req, res) => {
    if (!req.query.address) {

        return res.send({
            error: "Invalid request! add address in query"
        });
    }
    res.send([{
        forecast: "foggy",
        Longitude: "30",
        latitude: "80",
        address: "Tejli"
    }]);

})
app.listen(port, () => {
    console.log("Server is up and  kicking @" + port);
});