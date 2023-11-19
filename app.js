// make node.js server by express module at es6

// import modules
const express = require("express")
const app = express()
const port = 3000
// const bodyParser = require("body-parser")
// const path = require("path")
// const fs = require("fs")
// const mysql = require("mysql")
// const db = require("./db")
// const session = require("express-session")
// const MySQLStore = require("express-mysql-session")(session)
// const passport = require("passport")
// const LocalStrategy = require("passport-local").Strategy
// const bcrypt = require("bcrypt")
// const flash = require("connect-flash")
// const multer = require("multer")
// const upload = multer({ dest: "./public/images/uploads" })
// const cookieParser = require("cookie-parser")
// const nodemailer = require("nodemailer")
// const smtpTransport = require("nodemailer-smtp-transport")
// const crypto = require("crypto")
// const async = require("async")
// const moment = require("moment")
// const request = require("request")
// const cheerio = require("cheerio")
// const url = require("url")

app.get("/", function (req, res) {
    res.send("Hello World!1234")
})

app.listen(port, function () {
    console.log(`Example app listening at http://localhost:${port}`)
})


// // set view engine
// app.set("view engine", "ejs")
// app.set("views", "./views")

// // set static directory
// app.use(express.static(path.join(__dirname, "public")))

// // set body-parser
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// // set session
// app.use(cookieParser())

// const options = {
//     host: db.host,
//     port: db.port,
//     user: db.user,
//     password: db.password,
//     database: db.database,
// }

// const sessionStore = new MySQLStore(options)

// app.use(
//     session({
//         secret: "your-secret-key",
//         resave: false,
//         saveUninitialized: false,
//         store: sessionStore,
//     })
// )

// // set passport
// app.use(passport.initialize())
// app.use(passport.session())

// // set flash
// app.use(flash())

// // set passport strategy
// passport.use(
//     new LocalStrategy(
//         {
//             // your strategy configuration here
//             usernameField: "email",
//             passwordField: "password",
//             passReqToCallback: true,
//         },
//         function (req, email, password, done) {
//             const connection = mysql.createConnection(options)
//             connection.connect()

//             const query = connection.query("select * from users where email=?", [email], function (err, rows) {
//                 if (err) return done(err)

//                 if (rows.length) {
//                     bcrypt.compare(password, rows[0].password, function (err, result) {
//                         if (err) return done(err)

//                         if (result) {
//                             return done(null, rows[0])
//                         } else {
//                             return done(null, false, { message: "Incorrect password." })
//                         }
//                     })
//                 } else {
//                     return done(null, false, { message: "Incorrect email." })
//                 }
//             })
//         }
//     )
// )

// // set passport serializeUser
// passport.serializeUser(function (user, done) {
//     done(null, user.email)
// })
