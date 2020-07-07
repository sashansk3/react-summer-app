const 
  express    = require('express'),
  app        = express(),
  path       = require('path'),
  bodyParser = require('body-parser'),
  { Pool }   = require('pg'),
  cors       = require('cors'),
  port       = 3001;

const db = new Pool({
  user    : 'postgres',
  host    : 'localhost',
  database: 'todos',
  password: 'example',
  port    : 5432,
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.options('*', cors());

app.get("/", async(req, res) => {
  // res.sendFile(path.join(__dirname + "/index.html"))
})

app.post("/auth", (req, res) => {
  let 
    login    = req.body.user.login,
    password = req.body.user.password;
  db
    .query(`SELECT * FROM summer.users WHERE login=$1 and password=$2`, [login, password])
    .then(request => {
      res.send(request.rows)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

app.post("/reg", async(req, res) => {
  let 
    login    = req.body.user.login,
    password = req.body.user.password;

    db
      .query(`SELECT EXISTS (SELECT 1 FROM summer.users WHERE login=$1 and password=$2)`, [login, password])
      .then(exist => {
        if(exist.exists){
          res.status(500).send(`USER WITH LOGIN ${login} ALREADY EXIST`)
        }
        else{
          db
            .query(`INSERT INTO summer.users (login, password) VALUES ($1, $2) RETURNING id`, [login, password])
            .then(request => {
              res.send(request.rows)
            }).catch(err => {
              res.status(500).send(err)
            })
        }
      }).catch(err => {
        res.status(500).send(err)
      })
})

require("./routes/todos.js")(app, db)
require("./routes/subjects.js")(app, db)

app.listen(port, () => {
  console.log(`Сервер запущен на ${port} порту`)
})