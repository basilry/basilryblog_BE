// make node.js server by express module at es6

// import modules
const express = require("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")
const mysql = require("mysql")
const db = require("./db")
const session = require("express-session")
const MySQLStore = require("express-mysql-session")(session)
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
const flash = require("connect-flash")
const multer = require("multer")
const upload = multer({ dest: "./public/images/uploads" })
const cookieParser = require("cookie-parser")
const nodemailer = require("nodemailer")
const smtpTransport = require("nodemailer-smtp-transport")
const crypto = require("crypto")
const async = require("async")
const moment = require("moment")
const request = require("request")
const cheerio = require("cheerio")
const url = require("url")

app.get("/", function (req, res) {
    res.send("Hello World!1234")
})

app.listen(port, function () {
    console.log(`Example app listening at http://localhost:${port}`)
})


// set view engine
app.set("view engine", "ejs")
app.set("views", "./views")

// set static directory
app.use(express.static(path.join(__dirname, "public")))

// set body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// set session
app.use(cookieParser())

const options = {
    host: db.host,
    port: db.port,
    user: db.user,
    password: db.password,
    database: db.database,
}

const sessionStore = new MySQLStore(options)

app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
    })
)

// set passport
app.use(passport.initialize())
app.use(passport.session())

// set flash
app.use(flash())

// set passport strategy
passport.use(
    new LocalStrategy(
        {
            // your strategy configuration here
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        function (req, email, password, done) {
            const connection = mysql.createConnection(options)
            connection.connect()

            const query = connection.query("select * from users where email=?", [email], function (err, rows) {
                if (err) return done(err)

                if (rows.length) {
                    bcrypt.compare(password, rows[0].password, function (err, result) {
                        if (err) return done(err)

                        if (result) {
                            return done(null, rows[0])
                        } else {
                            return done(null, false, { message: "Incorrect password." })
                        }
                    })
                } else {
                    return done(null, false, { message: "Incorrect email." })
                }
            })
        }
    )
)

// set passport serializeUser
passport.serializeUser(function (user, done) {
    done(null, user.email)
})

// set passport deserializeUser
passport.deserializeUser(function (email, done) {
    const connection = mysql.createConnection(options)
    connection.connect()

    const query = connection.query("select * from users where email=?", [email], function (err, rows) {
        if (err) return done(err)

        done(null, rows[0])
    })
})

// set flash message
app.use(function (req, res, next) {
    res.locals.isAuthenticated = req.isAuthenticated()

    res.locals.flashMessages = req.flash()

    res.locals.user = req.user

    next()
})

// set routes
app.use("/", require("./routes/home"))
app.use("/users", require("./routes/users"))
app.use("/posts", require("./routes/posts"))
app.use("/comments", require("./routes/comments"))
app.use("/likes", require("./routes/likes"))
app.use("/search", require("./routes/search"))
app.use("/api", require("./routes/api"))
app.use("/admin", require("./routes/admin"))
app.use("/admin/users", require("./routes/admin/users"))
app.use("/admin/posts", require("./routes/admin/posts"))
app.use("/admin/comments", require("./routes/admin/comments"))
app.use("/admin/likes", require("./routes/admin/likes"))
app.use("/admin/search", require("./routes/admin/search"))
app.use("/admin/api", require("./routes/admin/api"))
app.use("/admin/setting", require("./routes/admin/setting"))
app.use("/admin/setting/users", require("./routes/admin/setting/users"))
app.use("/admin/setting/posts", require("./routes/admin/setting/posts"))
app.use("/admin/setting/comments", require("./routes/admin/setting/comments"))
app.use("/admin/setting/likes", require("./routes/admin/setting/likes"))
app.use("/admin/setting/search", require("./routes/admin/setting/search"))
app.use("/admin/setting/api", require("./routes/admin/setting/api"))

// set 404 page
app.use(function (req, res, next) {
    res.status(404).render("404")
})

// set 500 page
app.use(function (err, req, res, next) {
    res.status(500).render("500")
})

// set cron
const cron = require("node-cron")

cron.schedule("0 0 0 * * *", function () {
    const connection = mysql.createConnection(options)
    connection.connect()

    const query = connection.query("delete from posts where created_at < now() - interval 1 day", function (err, rows) {
        if (err) throw err
    })

    connection.end()
})