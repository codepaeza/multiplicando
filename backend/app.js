let express = require("express"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  //database = require("./database"),
  bodyParser = require("body-parser");

//  Connect  mongoDB
mongoose.Promise = global.Promise;
mongoose
   .connect(
    "mongodb+srv://<usuario>:<contraseña>@cluster0.aytkl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
   )
   .then(() => console.log("Database connected!"))
   .catch((err) => console.log(err));

var db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to mongoDB");
});

/*
mongoose
  .connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database  connected");
    },
    (error) => {
      console.log("Database could't be connected to: " + error);
    }
  );
  */
//Se modifico esta ruta
//const multiplicandoAPI = require("../backend/routes/multiplicacion.route");
const multiplicacionAPI = require("./routes/multiplicacion.route");
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// API se modifico
//app.use("/api", multiplicandoAPI);
app.use("/api", multiplicacionAPI);

app.set("PORT", process.env.PORT || 3000);
app.listen(app.get("PORT"), () => {
  console.log(`Server started on port: ${app.get("PORT")}`);
});

/*
//  Create  port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});
*/
// Find 404
app.use((req, res, next) => {
  next(createError(404));
});

//  error  handler
app.use(function(err, req, res) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
