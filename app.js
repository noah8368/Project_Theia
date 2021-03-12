var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose =
        require("passport-local-mongoose"),
    User = require("./models/user");
    router=express.Router();

const { spawn } = require('child_process');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb+srv://front-end:la0frxQ4SqmDv6lS@hercules.zn3hs.mongodb.net/users?retryWrites=true&w=majority");

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var cors = require('cors');
app.use(cors());
// stuff for cors problems
router.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
    });

//=====================
// ROUTES
//=====================

// Showing home page
app.get("/", function (req, res) {
    res.render("home");
});

// Showing secret page
app.get("/secret", isLoggedIn, function (req, res) {
    res.render("secret");
});

// Showing register form
app.get("/register", function (req, res) {
    res.render("register");
});

// Handling user signup
app.post("/register", function (req, res) {
    var username = req.body.username
    var password = req.body.password
    User.register(new User({ username: username }),
            password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }

        passport.authenticate("local")(
            req, res, function () {
            res.render("secret");
        });
    });
});

//Showing login form
app.get("/login", function (req, res) {
    res.render("login");
});

//Handling user login
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function (req, res) {
});

//Handling user logout
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

//displaying profile
app.get('/user/:username', (req, res) => {
    User.findOne({username: req.params.username}).
    then((user) => {
        if (!user) {
            var username = req.params.username
            var password = "password"
            User.register(new User({ username: username, favorites: [ "https://www.google.com/" ] }),
                    password, function (err, user) {
                if (err) {
                    console.log(err);
                    return res.render("register");
                }
        
                passport.authenticate("local")(
                    req, res, function () {
                    res.render("secret");
                });
            });
                }
        else {
            res.send({
                username: user.username,
                favorites: user.favorites,
            });
            console.log(user);
        }
    })
});

//getting profile
app.post('/push', (req, res) => {
    console.log(req.body.username);
    console.log(req.body.favorites);
    User.findOne({username: req.body.username}).
    then((user) => {
        if (!user) {
            res.send({
                msg: "User not found!"
            });
            return {msg: "No user with this username was found."}
        }
        else {
            User.update({username: req.body.username}, {
                username: req.body.username,
                favorites: req.body.favorites,
            }, function(err, doc) {
                console.log(err)
            })
            console.log(user);
        }
    })
});

//getting python script arguments
app.post('/pyargs', (req, res) => {
    console.log(req.body.link);
    console.log(req.body.longitude);
    console.log(req.body.latitude);
    url = req.body.link;
    long = req.body.longitude;
    lat = req.body.latitude;
    var dataToSend;
    const python = spawn('python3', ['src/web_recorder.py',url,lat,long]);
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ... ');
        dataToSend = data.toString();
        console.log(dataToSend);
    })
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        res.send("done")
    });
});

app.get('py', (req, res) => {
    
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

var port = process.env.PORT || 8000;
app.listen(port, function () {
    console.log("Server Has Started!");
});
