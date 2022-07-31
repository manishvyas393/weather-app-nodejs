const express = require("express")
const path = require("path")
const app = express()
const hbs = require("hbs")

const geoCode = require("./utils/geocode")
const foreCast = require("./utils/forecast")

const publicDir = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.set('view engine', 'hbs')
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDir))

app.get("/", (req, res) => {
      res.render("index", {
            title: "weather app",
            name: "Manish"
      })
})
app.get("/about", (req, res) => {
      res.render("about", {
            title: "About",
            name: "Manish"
      })
})
app.get("/help", (req, res) => {
      res.render("help", {
            title: "Help",
            name: "Manish"
      })
})
app.get("/weather", (req, res) => {
      if (!req.query.address) {
            return res.send({
                  error: "please provide location"
            })
      }
      geoCode(req.query.address, (error, { latitude, longitude, location }={}) => {
            if (error) {
                  return res.send({ error })
            }
            foreCast(latitude, longitude, (error, foreCastData) => {
                  if (error) {
                        return res.send({error})
                  }
                  res.send({
                        forecast: foreCastData,
                        location,
                        address:req.query.address
                  })
            })
      })
})

app.get("/help/*", (req, res) => {
      res.render("404", {
            title: "404 Page Not Found",
            name: "Manish",
            message: "The page you are looking cannot be found"
      })
})
app.get("*", (req, res) => {
      res.render("404", {
            title: "404 Page Not Found",
            name: "Manish",
            message: "The page you are looking cannot be found"
      })
})
app.listen(4000, () => console.log("started"))