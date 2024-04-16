require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var Instrument = require("./models/instrument");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(function (username, password, done) {
    Account.findOne({ username: username })
      .then(function (user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      })
      .catch(function (err) {
        return done(err);
      });
  })
);



const connectionString = process.env.MONGO_CON;
mongoose = require("mongoose");
mongoose.connect(connectionString)

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connection to DB succeeded");
});

async function recreateDB() {
  await Instrument.deleteMany();

  let instance1 = new Instrument({
    instrument_name: "Piano",
    category: "Keyboard",
    price: 100,
  });
  let instance2 = new Instrument({
    instrument_name: "Guitar",
    category: "String",
    price: 500,
  });
  let instance3 = new Instrument({
    instrument_name: "Drums",
    category: "Percussion",
    price: 800,
  });

  await instance1
    .save()
    .then((doc) => {
      console.log("First Object Saved");
    })
    .catch((error) => {
      console.error(error);
    });

  await instance2
    .save()
    .then((doc) => {
      console.log("Second Object Saved");
    })
    .catch((error) => {
      console.error(error);
    });

  await instance3
    .save()
    .then((doc) => {
      console.log("Third Object Saved");
    })
    .catch((error) => {
      console.error(error);
    });
}

let reseed = true;
if (reseed) {
  recreateDB();
}

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var instrumentsRouter = require("./routes/instruments");
var gridRouter = require("./routes/grid");
var randomRouter = require("./routes/pick");
var resourceRouter = require('./routes/resource');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/instruments", instrumentsRouter);
app.use("/grid", gridRouter);
app.use("/randomitem", randomRouter);
app.use("/resource", resourceRouter);



// passport config
// Use the existing connection
// The Account model
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
