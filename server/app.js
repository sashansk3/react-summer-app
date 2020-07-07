const 
  express    = require('express'),
  app        = express(),
  bodyParser = require('body-parser'),
  cors       = require('cors'),
  serverConf = require("./config/server.conf");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.options('*', cors());

require("./routes/users.route")(app)
require("./routes/todos.route")(app)
require("./routes/subjects.route")(app)
require("./routes/labs.route")(app)

app.listen(serverConf.port, serverConf.host,() => {
  console.log(`SERVER LISTENS http://${serverConf.host}:${serverConf.port}`)
})