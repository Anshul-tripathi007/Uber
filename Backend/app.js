const express = require('express')
const app = express()
const {connectToDB} = require('./db/database');
const { signUp } = require('./routes/authentication/signup');
const { logIn } = require('./routes/authentication/login');
const { authenticateUser} = require('./middleware/authorization');
const cookieParser = require('cookie-parser');
const { getProfile } = require('./routes/authentication/getProfile');
const { logOut } = require('./routes/authentication/logOut');
const captainRouter = require('./routes/captainRoutes/captainRoutes');
const port =3000;

var cors = require('cors');
const mapRouter = require('./routes/mapRoutes/mapRoutes');
const rideRouter = require('./routes/rideRoutes');
const http = require('http');
const { initializeSocket } = require('./socket');

const server = http.createServer(app);
initializeSocket(server);


app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

connectToDB.then(()=>{
    console.log("connected to MONGODB succesfully")
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/signup',signUp)
app.post('/login',logIn)
app.get('/profile',authenticateUser,getProfile)
app.get('/logout',logOut)

app.use('/captain',captainRouter)
app.use("/maps",mapRouter)
app.use("/ride",rideRouter)

server.listen(port, () => {
  console.log(`http://localhost:${port}`)
})


