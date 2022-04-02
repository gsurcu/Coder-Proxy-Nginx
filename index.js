const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const passport = require('./middlewares/passport');
const cluster = require('cluster')
const os = require('os')

const env = require('./env.config');
const dbConfig = require('./db/config');
const apisRoutes = require('./routers/app.routers');

const mode = process.argv[3] == 'cluster';
const app = express();
console.log(mode)
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(session({
  name: 'coder-session',
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: dbConfig.mongodb.connectTo('sessions')
  })
}));
app.use(passport.initialize());
app.use(passport.session());

// Template engines
app.set('views', './views');
app.set('view engine', 'ejs');

// Routes
app.use(apisRoutes);

if (mode && cluster.isPrimary) {
  console.log('Primary process PID =>', process.pid)
  
  const numCPUs = os.cpus().length
  console.log('No. de nucleos => ', numCPUs)

  for (let i = 0; i < numCPUs; i++) cluster.fork();

  cluster.on('exit', (worker, code) => {
    console.log('Worker ', worker.process.pid, `Exitted on ${new Date().toLocaleDateString()}`);
    cluster.fork()
  })
} else {
  const PORT = process.argv[2] || 8080
  const runningServer = app.listen(PORT, async () => {
    mongoose.connect(dbConfig.mongodb.connectTo('ecommerce'))
    .then(() => {
      console.log('Connected to DB!');
      console.log('[', process.pid, `] => running on http://localhost:${PORT}`);
    });
  });
  
  runningServer.on('error', (error) => {
    console.log(error.message)
  });
}